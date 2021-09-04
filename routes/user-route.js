const express = require('express');
const { User, registerValidator,loginValidator } = require('../entities/user');
const router = express.Router();
const bycript =  require('bcrypt'); 
const _ = require('lodash');


router.post("/auth" , async(req,res)=>{
    const { error} =loginValidator.validate(req.body);
        if(error){
            res.status(400).send(error.details[0].message);
        }else{
            let user = await User.findOne({email:req.body.email})
            if(!user) return res.status(400).send("user with this email doesn't exist!");
            let validpassword = await bycript.compare(req.body.password ,user.password)
            if(!validpassword){
                return res.status(400).send("password is not correct!")
            }
            let token = user.generateToken();
            res.status(200).header("sessionId" ,token).send(_.pick(user, ["_id","name", "email"]));
        }

})

router.post("/register" , async(req,res)=>{
    const { error} =registerValidator.validate(req.body);
    if(error){
        res.status(200).send(error.details[0].message);
    }else{
        let user = await User.findOne({email:req.body.email})
        if(user) return res.status(400).send("user with this email is already registered!");
        user =new User(req.body);
        let salt = await bycript.genSalt(9); //should get this from env variables
        let hashed = await bycript.hash(req.body.password,salt);
        user.password=hashed;
        await user.save();
        let token = user.generateToken();
        console.log(token)
        res.status(200).header("sessionId",token).send(_.pick(user, ["_id","name", "email"]));

    }
})
module.exports = router;
