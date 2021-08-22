const router = require('express').Router()
const {addThought, 
    removeThought, 
    addReaction,
    removeReaction, 
    getAllThoughts, 
    getOneThought, 
    updateThought} = require('../../controllers/thoughts-controller')

router.route('/')
.post(addThought)
.get(getAllThoughts)
router.route('/:id')
.get(getOneThought)
.delete(removeThought)
.put(updateThought)
router.route('/:thoughtId/reactions/')
.post(addReaction)
.delete(removeReaction)

module.exports = router