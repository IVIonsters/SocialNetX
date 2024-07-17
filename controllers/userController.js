//Importing the User and Thought models
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async gUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Something went wrong!, users not retrieved', details: err });
        }
    },

    // get one user
    async gOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
    
            // if no user is found
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong!, no user found', details: error });
        }
    },

    // create user
    async cUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong!, user not created', details: error });
        }
    },

    // update user
    async uUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            // if no user is found
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong!, user not updated', details: error });
        }
    },

    // delete user
    async dUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            // if no user is found
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            // delete all thoughts associated with the user
            await Thought.deleteMany({ username: user.username });
            res.json({ message: 'User thoughts deleted!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong!, user not deleted', details: error });
        }
    },

    // add friend
    async aFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');

            // if no user is found
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong!, friend not added', details: error });
        }
    },

    // delete friend
    async dFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');

            // if no user is found
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong!, friend not deleted', details: error });
        }
    },
};