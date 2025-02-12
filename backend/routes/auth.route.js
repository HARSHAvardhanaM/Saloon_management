const express = require("express");
const Saloon = require("../models/saloon.model.js")

const router = express.Router();

router.post("/signup",async(req,res)=>{
    try {
        const {username="" , email="" ,password=""} = req.body;
        if(([username,email,password].some(val=>val.trim()===""))){
            throw new Error("Every fields are required")
        }
        const newSaloon = new Saloon({
            username,email,password
        });
        // res.send(newSaloon)
        const saloon = await newSaloon.save();
        saloon.password = undefined
        if(!saloon){
            throw new Error("Something went wrong in server")
        }
        res.status(200).json({message : "Saloon user created successfully", user : saloon})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

router.post("/login",async(req,res)=>{
    try {
        const { email="" ,password=""} = req.body;
        if(([email,password].some(val=>val.trim()===""))){
            throw new Error("Every fields are required")
        }
        const saloon = await Saloon.findOne({email});
        if(!saloon){
            throw new Error("Invalid credentials")
        }
        const isPasswordCorrect = await saloon.isPasswordCorrect(password)
        if(!isPasswordCorrect){
            throw new Error("Invalid credentials")
        }
        const token = saloon.generateJwt();
        saloon.password = undefined;
        res.cookie("token",token,{maxAge : 24 * 3600000})
        .status(200).json({message : "Saloon user loggedin successfully", user : saloon})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

router.post("/logout",(req,res)=>{
    res.cookie("token",undefined,{maxAge : 0})
    .json({message : "Logout successfull"})
})

module.exports = router