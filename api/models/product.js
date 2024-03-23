const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  qty: Number,
});

const Product = model('Product', productSchema);

module.exports = Product;
