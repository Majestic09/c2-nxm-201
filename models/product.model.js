

const mongoose = require("mongoose");
const { stringify } = require("querystring");

const ProdctSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        unique:true
    },
    brand: {
        type: String,
        required: true
    }
   
   
})

const ProductModel = mongoose.model("productC2", ProdctSchema);

module.exports = { ProductModel };