const User = require("./models/User");
const Listing = require("./models/Listing");
const Booking = require("./models/Booking");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}

const validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
exports.resolvers = {
  Query: {
    searchListingByName: async (parent, args) => {
      return Listing.findByName(args.listing_title);
    },
    searchListingByCity: async (parent, args) => {
      return Listing.findByCity(args.city);
    },
    searchListingByPostalCode: async (parent, args) => {
      return Listing.findByPostalCode(args.postal_code);
    },
    viewAllListings: async (parent, args) => {
      return Listing.find({});
    },
    listAllUserBookings: async (parent, args) => {
      return Booking.find({});
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      console.log(args);

      let newUser = new User({
        username: args.username,
        firstname: args.firstname,
        lastname: args.lastname,
        password: args.password,
        email: args.email,
        type: args.type,
      });

      return newUser.save();
    },

    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    createListing: async (parent, args) => {
      console.log(args);

      let newListing = new Listing({
        listing_id: args.listing_id,
        listing_title: args.listing_title,
        description: args.description,
        street: args.street,
        city: args.city,
        postal_code: args.postal_code,
        price: args.price,
        email: args.email,
        username: args.username,
      });

      return newListing.save();
    },
    createBooking: async (parent, args) => {
      console.log(args);

      let newBooking = new Booking({
        listing_id: args.listing_id,
        booking_id: args.booking_id,
        booking_date: args.booking_date,
        booking_start: args.booking_start,
        booking_end: args.booking_end,
        username: args.username,
      });
      return newBooking.save();
    },
  },
};
