const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator")

const saloonSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 12
    },
    email: {
        type: String,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: "Enter a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

saloonSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

saloonSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

saloonSchema.methods.generateJwt = function () {
    return jwt.sign(
        { id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }
    )
}

const Saloon = new mongoose.model("Saloon", saloonSchema);

module.exports = Saloon;