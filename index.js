
const express = require("express");
const { connection } = require("./config/db")
const {userRouter}=require("./routes/user.route")
const { prodRouter } = require("./routes/product.route")
const {auth}=require("./middleware/auth.middleware")
const app = express();
require("dotenv").config();

app.use(express.json())
app.use("/user",userRouter)
// app.use("/prod",auth,prodRouter)
app.listen(process.env.PORT, async() => {
    try {
        await connection;
        console.log("connected to db");
    } catch (err) {
        console.log(err)
    }
    console.log("Server is running at:",process.env.PORT);
})