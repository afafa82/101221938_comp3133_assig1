const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Duplicate username Not allowed"],

    required: [true, "Please enter username"],
    trim: true,
    lowercase: true,
  },
  firstname: {
    type: String,
    required: [true, "Please enter first name"],
    trim: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    alias: "surname",
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [
      true,
      "Password must be min 6 characters length and can contain only upper/lower alphabets, 0-9, #, $, &, _",
    ],
    trim: true,
    minlength: 6,
    //Custom validation
    validate: function (value) {
      var passwordRegex = /^[A-Za-z0-9~#$%_]+$/;
      return passwordRegex.test(value);
    },
  },
  email: {
    type: String,
    required: true,
    //index: true, //Optional if unique is defined
    trim: true,
    uppercase: true,
    validate: function (value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})$/;
      return emailRegex.test(value);
    },
  },
  type: {
    type: String,
    required: true,
    enum: ["admin", "customer"],
    trim: true,
    lowercase: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
