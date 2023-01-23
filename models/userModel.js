const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is require']
    },
    email:{
        type:String,
        required:[true,'email is require']
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
})

const userModel = mongoose.model('register' , userSchema);

module.exports = userModel;