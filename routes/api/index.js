const router = require("express").Router();
const profilesRoutes = require("./profileRoutes");
const userRoutes = require("./userRoutes");

router.use("/profiles", profilesRoutes);
router.use("/users", userRoutes);

module.exports = router;
