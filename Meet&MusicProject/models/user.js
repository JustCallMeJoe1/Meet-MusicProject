/*

    Author: Joe Strickland
    Model for users of the application. Will store user information for logging in and registering within the application.
    Date: April 16th, 2022

*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for the user. Fields are [firstName, lastName, email, password]. All use required validator and email has the unique validator
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Must provide a First Name for an account."],
        minlength: [2, "First Name must have at least 2 characters."],
        maxlength: [60, "First Name can have at most 60 characters."],
    },
    lastName: {
        type: String,
        required: [true, "Must provide a Last Name for an account."],
        minlength: [2, "Last Name must have at least 2 characters."],
        maxlength: [60, "Last Name can have at most 60 characters."],
    },
    email: {
        type: String,
        required: [true, "Must provide an Email for an account."],
        minlength: [5, "Email must have at least 2 characters."],
        maxlength: [50, "Email can have at most 50 characters."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Must provide a password for the account."],
        minlength: [7, "Email must have at least 7 characters."],
        maxlength: [50, "Email can have at most 50 characters."],
    }

});

//Collection name in mongoDB is gonna be users
module.exports = mongoose.model("User", userSchema);