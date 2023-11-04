const connection = require("../config/db");
const { Thought, User } = require("../models");
const mongoose = require("mongoose");

const seedData = async () => {
  try {
    const existingUsers = await User.find();
    const existingThoughts = await Thought.find();

    let user1, user2, user3, user4, user5; // Declare user variables

    if (existingUsers.length === 0) {
      // Create users
      user1 = await User.create({
        username: "JohnDoe217",
        email: "john.doe@example.com",
        thoughts: [],
        friends: [],
      });

      user2 = await User.create({
        username: "CodingIsFun393",
        email: "coding.fun@example.com",
        thoughts: [],
        friends: [],
      });

      user3 = await User.create({
        username: "WebDevGeek99",
        email: "webdev.geek@example.com",
        thoughts: [],
        friends: [],
      });

      user4 = await User.create({
        username: "CodeNinja123",
        email: "code.ninja@example.com",
        thoughts: [],
        friends: [],
      });

      user5 = await User.create({
        username: "DevExplorer55",
        email: "dev.explorer@example.com",
        thoughts: [],
        friends: [],
      });

      // Associate friends with users
      user1.friends.push(user2, user3, user4, user5);
      user2.friends.push(user1, user3, user4, user5);
      user3.friends.push(user1, user2, user4, user5);
      user4.friends.push(user1, user2, user3, user5);
      user5.friends.push(user1, user2, user3, user4);

      // Save changes
      await user1.save();
      await user2.save();
      await user3.save();
      await user4.save();
      await user5.save();

      console.log("Seed data for users created successfully!");
    } else {
      console.log("Seed data for users already exists.");
    }

    if (existingThoughts.length === 0) {
      // Create thoughts with reactions

      const thought1 = await Thought.create({
        thoughtText: "Coding is so much fun! I love being a full stack web developer.",
        username: user1.username,
        createdAt: new Date(),
        reactions: [
          {
            reactionBody: "I totally agree!",
            username: user2.username,
            createdAt: new Date(),
            reactionId: new mongoose.Types.ObjectId(),
          },
          {
            reactionBody: "Me too! Full stack development is awesome!",
            username: user1.username,
            createdAt: new Date(),
            reactionId: new mongoose.Types.ObjectId(),
          },
        ],
      });


      // Associate thoughts with users
      user1.thoughts.push(thought1);


      // Save changes
      await user1.save();


      console.log("Seed data for thoughts created successfully!");
    } else {
      console.log("Seed data for thoughts already exists.");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
