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


    // update user


    // delete user


    // add friend


    // delete friend
};