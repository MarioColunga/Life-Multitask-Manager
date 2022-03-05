const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoute = require("./home");

router.use("/", homeRoute);
router.use("/api", apiRoutes);

router.get("*", (_, res) => {
  res.render("404");
  res.status(404);
});

module.exports = router;
