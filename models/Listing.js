const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  listing_id: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  listing_title: {
    type: String,
    required: [true, "Please enter the title"],
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  postal_code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },

  price: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (value < 0.0) {
        throw new Error("Negative Price aren't real.");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: function (value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    },
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
