const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = model("Cart", cartSchema);
