const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: 'thoughts',
                path: 'user',
                select: "-__v"
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            });
    },

    //add a thought to user
    addThought({ params, body }, res) {
        console.log(body)
        Thought.create({ ...body, user: params.userId })
            .then((_id) => {
                console.log(params.userId)
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id._id } },
                    { new: true }

                );
            })
            .then(dbThoughtData => {

                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // add a reaction to thought
    addReaction({ params, body }, res) {

        console.log(body, "*********reaction********")
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reaction: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No user found with this id" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err))
    },

    // remove reaction
    removeReaction({ params }, res) {
        console.log(params, "******** DELETEING REACTION")
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reaction: { _id: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }

}







module.exports = thoughtController;