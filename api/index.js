const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs").promises;

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/products-list")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//   });
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");

app.use("/products", productRoute);
app.use("/cart", cartRoute);
