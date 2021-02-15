const { Thought, User } = require('../models');


const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // createUser
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user with thoughts
    deleteUser({ params }, res) {
        console.log(params, "***********************hello hello this is delete user*****************************")
        // 
        Thought.deleteMany({
            user: { _id: params.userId },
            reaction: { user: params.userId },

        }).then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ message: "no user with this id" });
            }
            return User.findByIdAndDelete({ _id: params.userId })
                .then(dbThoughtData => res.json(dbThoughtData))
                .catch(err => res.json(err));
        })
            .catch(err => res.json(err));
    },



    // add friend  /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
        console.log(params)
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id" })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))

    },

    // remove friend 
    removeFriend({ params }, res) {
        // console.log(params, "******** Removing Friend")
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = userController;

