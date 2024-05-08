const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: [String],
      enum: [
        "Italian",
        "Mexican",
        "Chinese",
        "Indian",
        "American",
        "French",
        "Japanese",
        "Mediterranean",
        "Thai",
        "Vegetarian",
        "Vegan",
        "Other",
      ],
    },
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    phoneNumber: {
      type: String,
    },
    website: {
      type: String,
    },
    openHours: {
      type: String,
    },
    priceRange: {
      type: String,
      enum: ["$ (0-10)", "$$ (11-30)", "$$$ (31-60)", "$$$$ (61+)", "Other"],
    },
    reservationsNeeded: {
      type: Boolean,
      default: false,
    },
    isDeliveryAvailable: {
      type: Boolean,
      default: false,
    },
    menuUrl: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
  },
  { timestamps: true },
);

const Restaurants = mongoose.model("Restaurants", restaurantSchema);

module.exports = Restaurants;