const jwt = require("jsonwebtoken");
const Saloon = require("../models/saloon.model.js")


const islogedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Invalid token")
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            throw new Error("Invalid token")
        }
        const user = await Saloon.findById(decodedToken.id).select("-password")
        req.user = user
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

module.exports = {islogedIn};