/*

    Author: Joe Strickland
    Middlware functions that act as rate limiters for certain actions performed across the website. Applied to routes.
    Date: April 27th, 2022

*/

const rateLimit = require("express-rate-limit");

//Login attempt rate limiter --> Prevent the user from submitting a certain amount of requests for a time frame.
exports.logInLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,            // 1 minute time window for a certain amount of requests
    max: 5,                             // 50 maximum attempts allowed within the 15 minute time window
    handler: (req, res, next) => {      //Handler function for when this occurs. Redirect to new Error.
        let error = new Error("Too many incorrect login attempts. Try again later.");
        error.status = 429;
        return next(error);
    }
});