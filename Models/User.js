// Import the Schema and model constructors from the 'mongoose' library
const { Schema, model } = require('mongoose');

// Define a new Schema for users
const userSchema = new Schema({
  // Define a field 'username' of type String, which is unique, required, and will be trimmed
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  // Define a field 'email' of type String, which is unique, required, and must match a specific pattern
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  // Define a field 'thoughts' as an array of ObjectIds referencing the 'Thought' model
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  // Define a field 'friends' as an array of ObjectIds referencing the 'User' model
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
},
{
  // Enable virtuals for JSON serialization
  toJSON: {
    virtuals: true,
  },
  // Do not create an automatic '_id' field
  id: false,
});

// Define a virtual 'friendCount' that retrieves the length of the user's friends array field
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create a User model using the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;