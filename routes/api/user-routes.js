const router = require('express').Router();

const {
    gUsers,
    gOneUser,
    cUser,
    uUser,
    dUser,
    aFriend,
    dFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/')
    .get(gUsers)
    .post(cUser);

// /api/users/:userId
router.route('/:userId')
    .get(gOneUser)
    .put(uUser)
    .delete(dUser);

// /api/users/:userId/friends/:friendId
route.route('/:userId/friends/:friendId')
    .post(aFriend)
    .delete(dFriend);

module.exports = router;