const router = require("express").Router();
const profilesRoutes = require("./profileRoutes");
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const activityRoutes = require("./activityRoutes");

router.use("/profiles", profilesRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/activities", activityRoutes);

module.exports = router;
