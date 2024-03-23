const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = model("Cart", cartSchema);
