const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [{
      product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }],
  total_price: { type: Number, required: true },
});

module.exports = mongoose.model("Cart", cartSchema);
