const mongoose = require('../config/dbConnect');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username : String,
    email : String,
    password : String,
    role: {
        type: String,
        default: 'user'
    },
    bookID : [{
        type: String,
        ref : "book"
    }]
});

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;