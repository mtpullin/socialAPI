const router = require('express').Router()
const {addThought, removeThought, addReaction,removeReaction, getAllThoughts, getOneThought} = require('../../controllers/thoughts-controller')

router.route('/api/thoughts')
.post(addThought)
.get(getAllThoughts)
router.route('/api/users/:thoughtId')
.get(getOneThought)
.delete(removeThought)
.put(addReaction)

router.route('/api/users/:thoughtId/:reactionId').delete(removeReaction)

module.exports = router