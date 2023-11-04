// Import the 'Router' function from the 'express' library
const router = require('express').Router();

// Import the API routes from the 'api' module
const apiRoutes = require('./api');

// Use the API routes for all requests that start with '/api'
router.use('/api', apiRoutes);

// If no API routes are hit, send a 404 error message
router.use((req, res) => {
    res.status(404).send('<h1>404 Error! Wrong Route!</h1>');
});

// Export the router to be used in other parts of the application
module.exports = router;