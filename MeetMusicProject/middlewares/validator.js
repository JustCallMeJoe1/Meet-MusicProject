/*

    Author: Joe Strickland
    Validation functions containing santization and validation rules for user generated input into the application.
    Date: April 28th, 2022

*/
const { body, validationResult } = require("express-validator");

//Validation to ensure that the user cannot access an event that does not exist.
exports.validateEventId = (req, res, next) => {
    let id = req.params.id;

    //Id needs to be 24 bits, needs a 24 bit hex id to represent an ObjectID in the database. Check the length of the given ID for at least 24 bits, AND the specific format of HEX
    if(!id.match(/^[0-9a-fA-F]{24}$/)) { //If ID does not match a 24 bit hex string (0-9, a-f, A-F, and 24 digits) then create a invalid request error
        let invalidError = new Error("Invalid Event ID for searching for a featured event!");
        invalidError.status = 400;  //400 (invalid)
        return next(invalidError);  //Call default error handler with status and message
    } else {
        return next();
    }
};

//Validation and Santization rules for email and password fields inside of req.body. LOGIN SANTIZATION/VALIDATION RULES.
exports.validateLogin = [
    body("email", "Email must be a valid email address!").isEmail().trim().escape().normalizeEmail(), 
    body("password", "Password must have at least 8 characters and at most 64 characters!").isLength({min: 8, max: 64})
];

//Validation function to return all error messages back to controller to display in a flash message.
exports.validateErrors = (req, res, next) => {
    //Retrieve the error messages from the login attempt if applicable
    let errorMessages = validationResult(req);

    //If errors have occurred within the validation, then redirect to login page with the flash errors
    if(!errorMessages.isEmpty()) {  
        errorMessages.array().forEach(error => {
            req.flash("error", error.msg);
        });
        return res.redirect("back");
    }

}