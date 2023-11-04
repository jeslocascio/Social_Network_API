// Import the 'connect' and 'connection' functions from the 'mongoose' library
const { connect, connection } = require('mongoose');

// Define the MongoDB connection string. If the 'MONGODB_URI' environment variable is set, use that. Otherwise, connect to a local MongoDB instance.
const db = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api';

// Connect to the MongoDB database using the connection string
connect(db);

// Export the 'connection' object, which represents the connection to the MongoDB database
module.exports = connection;