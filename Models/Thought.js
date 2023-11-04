const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toDateString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Reference the Reaction schema here
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});


// Virtual to retrieve the length of the thought's reactions array field
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  const Thought = model('Thought', thoughtSchema);
  
  module.exports = Thought;