const router = require("express").Router();
const UserModel = require("../../models/User");

router.post("/login", async (req, res) => {
  try {
    console.log("login");
    const userData = await UserModel.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.id = userData.dataValues.id;
      req.session.logged_in = true;

      res.status(200).json({
        user: userData.dataValues,
        success: true,
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({ ...user, message: "User was created" });
  } catch (error) {
    console.log("e: ", error);
    res.status(500).json({ ...error, message: "Unable to create user" });
  }
});

module.exports = router;
