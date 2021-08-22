const {Thought, User} = require('../models')

const thoughtController = {
    getAllThoughts(req,res){
        Thought.find()
        .populate({ path: 'reactions', select:'-__v'})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    
    },
    getOneThought({params}, res){
        Thought.findOne({_id: params.id})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'no thoughts with this id'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    
    addThought({body}, res){
        Thought.create(body)
        .then(dbThoughtData => {
            User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: dbThoughtData._id}},
                {new: true}
            )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'no user found'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err=> res.json(err))
        })
        .catch(err=> res.status(400).json(err))
    },
    updateThought({params, body},res){
        Thought.findOneAndUpdate({_id: params.id},body,{new:true})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message:'no thought found'})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    },
    addReaction({params,body},res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: { reactions: body}},
            {new:true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'thought not found'})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },

    removeThought({params}, res){
        Thought.findOneAndDelete({_id: params.id})
        .then(deletedThought => {
            if(!deletedThought){
                res.status(404).json({message: 'no thought with this id'})
                return
            }
            User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.id}},
                {new:true}
            )
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'user not found'})
                return
            }
            res.status(dbUserData)
        })
        .catch(err => res.json(err))
    },
    removeReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: body.reactionId}}},
            {new:true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message:'not thought found'})
                return
            }
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))

    }
}

    module.exports = thoughtController;