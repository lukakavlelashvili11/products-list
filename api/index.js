const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const { setInitialData } = require("./utils/product");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST || "mongodb://localhost:27017";

mongoose
  .connect(`${dbHost}/products-list`)
  .then(async () => {
    console.log("MongoDB connected:",dbHost);
  })
  .catch((err) => console.error("MongoDB connection error", err));

const db = mongoose.connection;

db.once("open", () => {
  db.listCollections().then((resp) => {
    const exists = resp.some((collection) => collection.name === "products");
    if (!exists) {
      setInitialData();
      console.log("Initial data is created");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");

app.use("/products", productRoute);
app.use("/cart", cartRoute);
