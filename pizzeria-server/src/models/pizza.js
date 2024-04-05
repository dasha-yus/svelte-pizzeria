const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
  weight: Number,
  price: Number,
});

const detailsSchema = new mongoose.Schema({
  proteins: Number,
  fats: Number,
  carbohydrates: Number,
  energy_value: Number,
});

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  sizes: [sizeSchema],
  details: detailsSchema,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Pizza", pizzaSchema);
