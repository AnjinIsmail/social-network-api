const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend


} = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);


// /api/users/:id

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)

router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(removeFriend)

router
    .route('/:userId').delete(deleteUser);






module.exports = router; 
