const Product = require("../models/product");

exports.getProductList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalItems = await Product.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      data: products,
      currentPage: page,
      totalPages,
      totalItems,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id);

    if (!data) return res.status(404).json({ message: "Data not found" });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
