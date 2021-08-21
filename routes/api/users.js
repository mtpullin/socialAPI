const router = require('express').Router()
const {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
} = require('../../controllers/user-controller')

router.route('/api/users')
.get(getAllUsers)
.post(addUser)

router.route('/api/users/:id')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser)

module.exports = router;