// Index file to export all routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Uses the userRoutes and thoughtRoutes files to create the API routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export the router to be used in other parts of the application
module.exports = router;