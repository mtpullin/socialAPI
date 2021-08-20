const {Thought, User} = require('../models')

const thoughtController = {
    addThought({params, body}, res){
        Thought.create(body)
        .then(dbThoughtData => {
            User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: dbThoughtData._id}},
                {new: true}
            )
        })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'no user found'})
            }
            res.json(dbThoughtData)
        })
        .catch(err=> res.json(err))
    },
    addReaction({params,body},res){

    },

    removeThought({params}, res){

    },
    removeReaction({params}, res){

    }
}

    module.exports = thoughtController;