const Cart = require("../models/cart");
const Product = require("../models/product");

exports.createCart = async (req, res) => {
  try {
    const cart = new Cart();
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId).populate("products");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart.products);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const productExists = cart.products.some((product) =>
      product._id.equals(productId)
    );

    if (productExists) {
      return res
        .status(400)
        .json({ message: "Product already exists in the cart" });
    }

    cart.products.push({ _id: product._id, quantity: 1 });
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
