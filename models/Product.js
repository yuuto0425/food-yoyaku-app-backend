const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required:true,
    },
    productName: {
      type: String,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
      max: 250,
    },
    volume: {
      type: Array,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
