const {Thought, User} = require('../models')

const userController = {
    addUser({body}, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    getAllUsers(req,res){
        User.find()
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    getOneUser({params}, res){
        User.findOne({_id: params.id})
        .populate([
            {path: 'thoughts', select:'-__v'},
            {path: 'friends', select:'-__v'}
        ])
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message:'user not found'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    updateUser({params, body}, res){
        User.findOneAndUpdate({_id: params.id},body, {new:true, runValidators: true})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message:'user not found'})
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },
    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'user not found'})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true, runValidators:true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'user not found'})
                return
            }
            User.findOneAndUpdate(
                {_id: params.friendId},
                {$push: {friends: params.userId}},
                {new: true, runValidators: true}
            )
            .then(dbUserData2 => {
                if(!dbUserData2){
                    res.status(404).json({message:'no friend found'})
                    return
                }
                res.json(dbUserData)
            })
            .catch(err=> res.json(err))
        })
        .catch(err => res.json(err))
    },
    deleteFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message:'user not found'})
                return
            }
            User.findOneAndUpdate(
                {_id: params.friendId},
                {$pull: {friends: params.userId}},
                {new: true, runValidators: true}
            )
            .then(dbUserData2 => {
                if(!dbUserData2){
                    res.status(404).json({message:'no friend found'})
                    return
                }
                res.json(dbUserData2)
            })
            .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
    }
}

module.exports = userController;