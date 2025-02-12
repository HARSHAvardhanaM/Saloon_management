const express = require("express");
const mongoose = require("mongoose")
const Token = require("../models/token.model.js");
const Saloon = require("../models/saloon.model.js");
const {islogedIn} = require("../utils/middleware.js")

const router = express.Router();

router.get("/saloon/data", islogedIn, async (req, res) => {
    const user = req.user;
    const tokens = await Token.aggregate([
        {
            $match: { saloonId: new mongoose.Types.ObjectId(user._id) }
        },
        {
            $project: {
                customerName: 1,
                services: 1,
                mobileNum: 1,
                totalAmount: 1,
                tokenNumber : 1,
                _id : 1,
                createdAt : 1
            }
        }
    ])
    if (!tokens) {
        res.status(200).json({ message: "No orders found" })
    }
    res.status(200).json({
        message: "Data fetched successfully",
        tokens: tokens
    })
});

router.delete("/saloon/:tokenId",islogedIn,async(req,res)=>{
    const {tokenId} = req.params;
    try {
        const deletedData = await Token.findByIdAndDelete(tokenId);
        if(!deletedData){
            throw new Error("No data found")
        }
        res.status(200).json({message : "Data Deleted successfully", deletedData })
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

router.get("/saloon/:tokenId",islogedIn,async(req,res)=>{
    const {tokenId} = req.params;
    try {
        const data = await Token.findById(tokenId);
        if(!data){
            throw new Error("No data found")
        }
        res.status(200).json({message : "Data fetched successfully", data })
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

router.get("/saloon",async(req,res)=>{
    const saloons = await Saloon.find({}).select("-password");
    let message = !saloons ? "No saloons found" : "Saloons fetched successfully"
    res.status(200).json({message  , saloons})
})

module.exports = router