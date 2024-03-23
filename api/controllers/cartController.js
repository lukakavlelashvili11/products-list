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
    const cart = await Cart.findById(cartId).populate(
      "products.product",
      "title price image"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productsWithQuantity = [];

    // Iterate through each item in the cart's products array
    for (const item of cart.products) {
      // Extract product details and quantity
      const { product, quantity } = item;

      // Push product details and quantity to the array
      productsWithQuantity.push({ product, quantity });
    }

    // Respond with the array of products with their quantities
    // res.json({ products: productsWithQuantity });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { qty } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingProductIndex = cart.products.findIndex((item) =>
      item.product.equals(productId)
    );

    if (existingProductIndex === -1) {
      cart.products.push({ product: productId, quantity: qty });
    } else {
      cart.products[existingProductIndex].quantity += qty;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { qty } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingProductIndex = cart.products.findIndex((item) =>
      item.product.equals(productId)
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity = qty;
    } else {
      return res.status(404).json({ message: "Product not found" });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

exports.deleteProduct= async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter(item => !item.product.equals(productId));

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};