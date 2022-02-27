const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    type: String!
  }
  type Listing {
    listing_id: String!
    listing_title: String!
    description: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String
    username: String!
  }
  type Booking {
    listing_id: String!
    booking_id: String!
    booking_date: String!
    booking_start: String!
    booking_end: String!
    username: String!
  }

  type Query {
    viewAllListings: Listing
    searchListingByName(listing_title: String!): [Listing]
    searchListingByCity(city: String!): [Listing]
    searchListingByPostalCode(postal_code: String!): [Listing]
    listAllUserBookings: Booking
  }

  type Mutation {
    createUser(
      username: String!
      firstname: String!
      lastname: String!
      password: String!
      email: String!
      type: String!
    ): User!

    login(username: String!, password: String!): User!

    createListing(
      listing_id: String!
      listing_title: String!
      description: String!
      street: String!
      city: String!
      postal_code: String!
      price: Float!
      email: String!
      username: String!
    ): Listing!

    createBooking(
      listing_id: String!
      booking_id: String!
      booking_date: Date!
      booking_start: Date!
      booking_end: Date!
      username: String!
    ): Booking!
  }
`;
