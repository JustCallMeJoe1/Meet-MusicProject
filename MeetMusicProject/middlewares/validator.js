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
    body("email", "Email must be a valid email address!").isEmail().trim().escape().normalizeEmail().isLength({min: 5, max: 50}), 
    body("password", "Password must have at least 8 characters and at most 64 characters!").isLength({min: 8, max: 64}).trim()
];

//Validation and Santization rules for registeration action on the website. REGISTER SANTIZATION/VALIDATION RULES.
exports.validateRegister = [
    body("firstName", "A proper first name must be provided!").trim().escape().isLength({min: 2, max: 60}),
    body("lastName", "A proper last name must be provided!").trim().escape().isLength({min: 2, max: 60}),
    body("email", "A proper email address must be provided!").isEmail().trim().escape().normalizeEmail().isLength({min: 5, max: 50}),
    body("password", "Password must have at least 8 characters and at most 64 characters!").isLength({min: 8, max: 64}).trim()
];

//Validation and Santization rules for creating a new event on the website. NEW EVENT SANTIZATION/VALIDATION RULES.
exports.validateEvent = [
    body("name", "A proper event name must be provided!").trim().escape().isLength({min: 1, max: 50}),
    body("topic", "A proper event category must be provided!").trim().escape().isLength({min: 1, max: 50}),
    body("details", "Proper event details must be provided!").trim().escape().isLength({min: 5, max: 900}),
    body("date", "A proper event date must be provided!").notEmpty().escape().trim().isDate().isAfter(),                //isAfter is very janky, likes to deny within 24 hours....
    body("startTime", "A proper event start time must be provided!").escape().trim().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).notEmpty(),
    body("endTime", "A proper event end time must be provided!").escape().trim().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).notEmpty(),
    body("endTime").custom((endTimeValue, {req}) => {

        //Retrieve end time from the user thing
        let endTimeHour = endTimeValue.substring(0,2);
        let endTimeMinute = endTimeValue.substring(3,5);
        let realEndTime = endTimeHour + endTimeMinute;
        
        //Retrieve the start time from the request
        let startTime = req.body.startTime;
        let startTimeHour = startTime.substring(0,2);
        let startTimeMinute = startTime.substring(3,5);
        let realStartTime = startTimeHour + startTimeMinute;

        //If the UTC time of the EndTime is greater than the StartTime, then it is a legit request. Otherwise it is not correct.
        if(realEndTime < realStartTime) {
            throw new Error("The end time cannot be before the start time!");
        }
        return true;

    }),
    body("location", "A proper event location must be provided!").escape().trim().isLength({min: 1, max: 150}),
    body("image", "A proper event image must be provided!").notEmpty().trim().escape(),
];

//Validation and Santization rules for RSVPing for an event on the website. RSVP ACTION SANTIZATION/VALIDATION RULES.
exports.validateRSVP = [
    body("statusRSVP", "A proper RSVP Action status must be provided!").notEmpty().escape().trim().toLowerCase().isIn(["yes","no","maybe"])
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
    } else {
        return next();
    }

}