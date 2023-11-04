// Import the Schema and model constructors from the 'mongoose' library
const { Schema, model } = require('mongoose');

// Import the Reaction schema
const reactionSchema = require('./Reaction');

// Define a new Schema for thoughts
const thoughtSchema = new Schema({
  // Define a field 'thoughtText' of type String, which is required and has a minimum length of 1 and a maximum length of 280 characters
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  // Define a field 'createdAt' of type Date, which defaults to the current date and time
  createdAt: {
    type: Date,
    default: Date.now,
    // Getter to transform the timestamp into a more readable date string
    get: (timestamp) => new Date(timestamp).toDateString(),
  },
  // Define a field 'username' of type String, which is required
  username: {
    type: String,
    required: true,
  },
  // Define a field 'reactions' as an array of Reaction schemas
  reactions: [reactionSchema],
},
{
  // Enable virtuals and getters for JSON serialization
  toJSON: {
    virtuals: true,
    getters: true,
  },
  // Do not create an automatic '_id' field
  id: false,
});

// Define a virtual 'reactionCount' that retrieves the length of the thought's reactions array field
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create a Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;