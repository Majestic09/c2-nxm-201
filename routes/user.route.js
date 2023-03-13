
const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {auth}=require("../middleware/auth.middleware")

userRouter.get("/", (req, res) => {
    res.send("HOME PAGE")
})

userRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const isexist = await userModel.findOne({ email });
        if (isexist) {
            res.send("User already exists")
        } else {
            bcrypt.hash(password, 8, async (err,hash) => {
                const user = new userModel({ email, name, password: hash, role });
                await user.save();
                res.send("Signup sucessfull");
            })
        }
    } catch (err) {
        res.status(500).json({msg:"something went wrong",error:err.message})
    }
})

//login route

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({msg:"Please Singup"})
        } else {
         bcrypt.compare(password, user.password, (err, result) => {
             if (result) {
                    
                    const token = jwt.sign({ user_id: user._id }, process.env.JSONKEY, { expiresIn: 60 })
               
                 const refresh = jwt.sign({ user_Id: user._id }, process.env.JSONKEY, { expiresIn: 450 })
                 res.status(200).send({ msg: "Login Sucessfull", token: token,refresh:refresh })
                } else {
                    res.send("something went wrong")
                }
            })
        }
       
    } catch (err) {
        res.status(500).json({msg:"something went wrong",error:err.message})
    }
})

userRouter.post("/refresh", (req, res) => {
    const refresh = req.body.refresh;
    try {
        const verifyToken = jwt.verify(refresh, process.env.JSONKEY);
        const user = userModel.find((user) =>
            user.id === verifyToken.id);
       
        console.log(user,"*****")
        if (!user) {
            res.send("Unauthorized");
        } else {
            const token = jwt.sign({ id: user.id }, process.env.JSONKEY, { expiresIn: 450 });
            res.send({token:token})
        }

    } catch (err) {
        res.status(401).json({msg:"Unauthorized"})
    }
})

userRouter.post("/logout", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const blacklist = new Blacklist({ token });
        await blacklist.save();
        res.send(200).send("Logged out sucessfully")
    } catch (err) {
        res.status(500).send("Server error")
    }
})
    
module.exports={userRouter}