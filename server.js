// Import the necessary modules
const express = require('express');
const db = require('./config/db');
const routes = require('./controllers');

// Set the port to the environment variable PORT or 3001 if it's not set
const PORT = process.env.PORT || 3001;

// Create an Express application
const app = express();

// Use middleware to parse URL-encoded bodies and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the routes defined in the controllers directory
app.use(routes);

// Once the database connection is open, start the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});