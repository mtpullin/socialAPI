const router = require('express').Router()
const {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller')

router.route('/')
.get(getAllUsers)
.post(addUser)

router.route('/:id')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser)
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;