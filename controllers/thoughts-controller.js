const {Thought, User} = require('../models')

const thoughtController = {
    addThought({params, body}, res){
        Thought.create(body)
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'no thought found'})
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