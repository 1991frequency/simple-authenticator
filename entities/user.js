const joi = require("joi");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let registervalidator = joi.object({ 
    name : joi.string().min(3).max(55).required(),
    email : joi.string().min(8).max(55).required(),
    password : joi.string().min(8).max(55).required()
}) 
let loginValidator = joi.object({
    email : joi.string().min(8).max(55).required(),
    password : joi.string().min(8).max(55).required()
}) 

userSchema= new mongoose.Schema({
    name : {
        type:String,
        required:true        ,
        min : 3,
        max : 55
    },
    email : {
        type : String,
        required:true,
        min:8,
        max : 55
    },
    password : {
        type : String,
        required:true,
        min : 8,
        max : 55
    }

})

userSchema.methods.generateToken = function(){
    return jwt.sign({_id : this._id}, "better save in env vars");
}
const User = mongoose.model('User',userSchema);
exports.User = User;
exports.registerValidator=registervalidator;
exports.loginValidator=loginValidator;
