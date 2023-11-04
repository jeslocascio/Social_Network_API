// Import the Schema constructor from the 'mongoose' library
const { Schema } = require('mongoose');

// Define a new Schema for reactions
const reactionSchema = new Schema({
  // Define a field 'reactionId' of type ObjectId
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  // Define a field 'reactionBody' of type String, which is required and has a maximum length of 280 characters
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  // Define a field 'username' of type String, which is required
  username: {
    type: String,
    required: true,
  },
  // Define a field 'createdAt' of type Date, which defaults to the current date and time
  createdAt: {
    type: Date,
    default: Date.now,
    // Getter to transform the timestamp into a more readable date string
    get: (timestamp) => new Date(timestamp).toDateString(),
  },
},
{
  // Enable getters for JSON serialization
  toJSON: {
    getters: true,
  },
  // Do not create an automatic '_id' field
  id: false,
});

// Export the reactionSchema
module.exports = reactionSchema;