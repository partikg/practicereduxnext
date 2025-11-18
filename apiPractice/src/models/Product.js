const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    thumbnail: String,
    description: String,
    category: String
});

module.exports = mongoose.model("Product", productSchema);
