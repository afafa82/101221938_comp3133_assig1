const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  listing_id: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  booking_id: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },

  booking_date: {
    type: Date,
    default: Date.now,
  },
  booking_start: {
    type: Date,
    default: Date.now,
  },
  booking_end: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
