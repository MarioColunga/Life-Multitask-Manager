const router = require("express").Router();

const userRoute = require("./users");
const projectRoute = require("./projects");
const activityRoute = require("./activities");

router.use("/users", userRoute);
router.use("/projects", projectRoute);
router.use("/activities", activityRoute);

module.exports = router;
