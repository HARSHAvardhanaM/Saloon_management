const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        min: 5,
        max: 12
    },
    tokenNumber : {
        type : Number,
        required : true
    },
    saloonId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Saloon"
    },
    services: {
        type: mongoose.Schema.Types.Mixed,
        required : true
    },
    mobileNum: {
        type: String,
        required: true
    },
    totalAmount : {
        type : Number,
        required : true
    }
},{timestamps : true});

const Token = new mongoose.model("Token",tokenSchema);

module.exports = Token