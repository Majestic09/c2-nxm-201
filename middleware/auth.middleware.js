
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("../models/user.model");


const auth = async(req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];

        
        const decodedToken = jwt.verify(token, process.env.JSONKEY);
        const { userId } = decodedToken;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).json({msg:'Unauthorized'})
        }
        req.user = user;
        next()
    } catch (err) {
        res.staus(401).json({msg:"unauthorized"})
    }
}

module.exports = {auth}