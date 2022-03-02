const router = require('express').Router();
const profilesRoutes = require('./profileRoutes');
const projectRoutes = require('./projectRoutes');
const activityRoutes = require('./activityRoutes');

// Prefix all routes defined in `bookRoutes.js` with `/books
router.use('/profiles', profilesRoutes);
router.use('/projects', projectRoutes);
router.use('/activities', activityRoutes);

module.exports = router;
