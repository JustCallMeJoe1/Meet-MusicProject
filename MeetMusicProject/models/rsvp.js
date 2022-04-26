/*

    Author: Joe Strickland
    Model file to store database schema for RSVPs to connections. An RSVP is associated with a user and a connection.
    Date: April 26th, 2022

*/

//Require all neccessary packages to be used within the model, derive anything from those packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create database schema for RSVPs. Model for the collection.
const RSVPSchema = new Schema({
    status: {
        type: String,
        required: [true, "A RSVP status is required for the RSVP field."]
    },
    userRSVP: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    eventRSVP: {
        type: Schema.Types.ObjectId,
        ref: "event"
    }
});

//Collection name in mongoDB is gonna be rsvps
module.exports = mongoose.model("RSVP", RSVPSchema);