// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String, 
  theImage: String,
  images: [String],
  video: String,
  publisher: String,
  price: Number,
  quantity: Number,
  date: { type: Date, default: Date.now },
  buyLink: String,
  about: String,
});

module.exports = mongoose.model("MakoProduct", productSchema);
