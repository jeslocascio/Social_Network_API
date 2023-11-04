// Import necessary modules
const router = require('express').Router();
const { User, Thought } = require('../../models');

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.find();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get a user by its ID
router.get('/:userId', async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.params.userId });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to update a user by its ID
router.put('/:userId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true }
        );
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to delete a user by its ID
router.delete('/:userId', async (req, res) => {
    try {
        const userData = await User.findOneAndDelete({ _id: req.params.userId });
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to add a friend to a user
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true }
        );
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to remove a friend from a user
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Export the router
module.exports = router;