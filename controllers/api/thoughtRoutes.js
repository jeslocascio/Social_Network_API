// Import necessary modules
const router = require('express').Router();
const { User, Thought } = require('../../models');
const mongoose = require('mongoose');

// Route to get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughtData = await Thought.find();
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get a thought by its ID
router.get('/:thoughtId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to create a new thought
router.post('/', async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body);
        const userData = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thoughtData._id } },
            { new: true }
        );
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to update a thought by its ID
router.put('/:thoughtId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true }
        );
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to delete a thought by its ID
router.delete('/:thoughtId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to add a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        );
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Export the router
module.exports = router;