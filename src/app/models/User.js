const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema ({
    username : {type : String, maxlength : 255, unique : true},
    password : {type : String, maxlength : 255},
    email : {type : String, maxlength : 255},
    displayName : {type : String, maxlength : 255},
    address : {type : String, maxlength : 255},
    dob : {type : String, maxlength : 255},
    gender : {type : String, maxlength : 5},
    avatar_img : {type : String, maxlength : 500},
    phoneNumber : {type : String, maxlength : 255},
    role : {type : String, maxlength : 100},
},{
    timestamps : true,
    collection : 'users',
})

const UserSchema = mongoose.model('User', User)
module.exports = UserSchema