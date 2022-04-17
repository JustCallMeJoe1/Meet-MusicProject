/*

    Author: Joe Strickland
    Model for users of the application. Will store user information for logging in and registering within the application.
    Date: April 16th, 2022

*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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

//Replace plain text in request with hashed and salted bcryaboutitpt version (Secure). Prior to saving to database.
userSchema.pre("save", function(next) {
    //current user being created
    let user = this;

    //If the password is not being modified, then ignore. If it relates to the password then we must hashbrown
    if(!user.isModified("password")) {
        return next();
    } else { //Hashbrown the password, then replace the plaintext with the hashbrown. Then continue with the function
        bcrypt.hash(user.password, 10).then((hashedPassword)=> {
            user.password = hashedPassword;
            next();
        }).catch(error => { //Internal database error with bcrypt
            next(error);
        })
    }
});

//Add a method to the userSchema that will compare a submitted password from a form to the database stord hash, using bcrypt compare method. Async
userSchema.methods.comparePasswords = function(submittedPassword) {
    return bcrypt.compare(submittedPassword, this.password);
}

//Collection name in mongoDB is gonna be users
module.exports = mongoose.model("User", userSchema);