const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema ({
    username : {type : String, maxlength : 255, required : true, unique : true},
    password : {type : String, maxlength : 255, required : true},
    email : {type : String, maxlength : 255, required : true},
    // displayName : {type : String, maxlength : 255, required : true},
    // addresss : {type : String, maxlength : 255, required : true},
    // dob : {type : Date, maxlength : 255, required : true},
    // gender : {type : String, maxlength : 5, required: true},
},{
    timestamps : true,
    collection : 'users',
})

const UserSchema = mongoose.model('User', User)
module.exports = UserSchema