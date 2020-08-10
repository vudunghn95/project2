const UserModel = require('../models/user.model');

function getUserBook(id){
    return UserModel.find({
        _id : id
    }).populate('bookID')
}

function getUser(id){
    return UserModel.find({
        _id : id
    })
}

function getUserByUsername(username){
    return UserModel.find({
        username : username
    })
}

function findAdmin(){
    return UserModel.find({
        role : 'admin'
    });
}

function updateUser(id,bookID){

    return UserModel.updateOne({
        _id: id
    },{
        bookID : bookID
    });
}

function createUser(user){
    return UserModel.create(user);
}
function loginUser(user){
    return UserModel.find(user);
}

module.exports = {
    getUserBook,
    getUser,
    updateUser,
    createUser,
    loginUser,
    getUserByUsername,
    findAdmin
}