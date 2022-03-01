const router = require('express').Router();
const profilesRoutes = require('./profileRoutes');

// Prefix all routes defined in `bookRoutes.js` with `/books
router.use('/profiles', profilesRoutes);

module.exports = router;
