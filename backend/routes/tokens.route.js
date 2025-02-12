const express = require("express");
const Token = require("../models/token.model.js")
const {islogedIn} = require("../utils/middleware.js")
const router = express.Router();
let token = 0

router.post("/token",islogedIn,async(req,res)=>{
    try {
        token += 1
        const saloon = req.user
        const {customerName="" , services="" ,mobileNum=""} = req.body;
        if(([customerName,mobileNum].some(val=>val.trim()===""))){
            throw new Error("Every fields are required")
        }
        let totalAmount = 0;
         Object.keys(services).forEach(val =>{
            totalAmount += services[val]
         })
        const saloonToken = new Token({
            customerName,saloonId : saloon._id,services,mobileNum,totalAmount,tokenNumber : token
        });
        if(!saloonToken){
            throw new Error("Something went wrong in server")
        }

        const newSaloonToken = await saloonToken.save();
        res.status(200).json({
            message : "Token generated successfully",
            token : newSaloonToken
        })
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

router.post("/token/set", async(req,res)=>{
    const tokenNum = parseFloat(req.body.tokenNum);
    token = tokenNum;
    res.status(200).json({message : "Token initialised successfully"})
})

module.exports = router