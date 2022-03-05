const router = require("express").Router();

const Project = require("../../models/Project");

router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).send({ ...project, message: "project was created" });
  } catch (error) {
    res
      .status(500)
      .send({ ...error, message: "project could not be created " });
  }
});

router.get("/user/:userId", async (req, res) => {
  console.log("holi");
  try {
    const projects = await Project.findAll({
      where: {
        userId: req.params.userId,
      },
    });

    res.status(200).send(projects);
  } catch (error) {
    res
      .status(500)
      .send({ ...error, message: "projects could not be retrieved " });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ ...error, message: "project could not be found" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Project.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send("save");
  } catch (error) {
    res.status(500).send({ ...error, message: "Unable to edit project " });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Project.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (error) {
    res.status(500).send({ ...error, message: "Unable to delete project" });
  }
});

module.exports = router;
