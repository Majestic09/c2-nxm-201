// const { ProductModel } = require('../models/product.model');
// const express = require("express");
// const prodRouter = express.Router()
// const {auth}=require("../middleware/auth.middleware")

// prodRouter.get("/product", async (req, res) => {
//     try {
//         const prod = await ProductModel.find();
//         res.send(prod)
       
//     } catch (err) {
//         res.send("Something went wrong")
//     }
//     prodRouter.post("/addproduct", auth, async (req, res) => {
//         try {
//             const payload = req.body;
//             const prod = new ProductModel(payload);
//             await prod.save();
//             res.send(prod)
      
//         } catch (err) {
//             res.send("Something went wrong")
//         }
//     });

//     prodRouter.put("/deleteproducts/:id", (req, res) =>{
//         try {
//             const id = req.params._id
//             const prod = ProductModel.findById(id);
//             res.send("deleted sucessfully")
//         } catch (error) {
            
//         }
//     })
// module.exports = {prodRouter}
