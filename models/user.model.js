
const mongoose = require("mongoose");
const { stringify } = require("querystring");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default:"user"
    }
   
})

const userModel = mongoose.model("userC2", userSchema);

module.exports = { userModel };