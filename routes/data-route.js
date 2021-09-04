const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');


apiRouter.get("/api" , async(req,res)=>{
    try{
        let user = jwt.verify( req.get("sessionId"), "better save in env vars")
        res.status(200).send("welcome to api section");
        console.log(user);
        //do something
    }catch(e){
        res.status(400).send("not allowed");
    }
})
module.exports=apiRouter;