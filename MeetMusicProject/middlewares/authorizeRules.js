/*

    Author: Joe Strickland
    Authorizing rules for various routes and actions across the website
    Date: April 18th, 2022

*/

const eventModel = require("../models/musicEvent");

//Verify the session to see whether a user is a guest or not. If they are a guest, let them proceed, otherwise redirect to profile.
exports.isGuest = (req, res, next) => {
    
    //Check to see if no user is in session
    if(!req.session.user) {
        return next();
    } else { //User is logged into the website
        req.flash("error", "Already logged into the website!");
        return res.redirect("/user/profile");
    }

};

//Verify that the session has a logged in user. If they are logged in, let them proceed, otherwise redirect them to login.
exports.isLoggedIn = (req, res, next) => {

    //Check to see if there is a user in session
    if(req.session.user) {
        return next();
    } else { //Session is currently a guest of the website.
        req.flash("error", "You must first login to perform that action!");
        return res.redirect("/user/login");
    }

};

//Verify that that the user is the host of the event. Otherwise provide a 401 error.
exports.isEventHost = (req, res, next) => {
    
    //Grab the event id from the URL params, query using this data
    let eventId = req.params.id;

    //Id needs to be 24 bits, needs a 24 bit hex id to represent an ObjectID in the database. Check the length of the given ID for at least 24 bits, AND the specific format of HEX
    if(!eventId.match(/^[0-9a-fA-F]{24}$/)) { //If ID does not match a 24 bit hex string (0-9, a-f, A-F, and 24 digits) then create a invalid request error
        let invalidError = new Error("Invalid Event ID!");
        invalidError.status = 400;  //400 (invalid)
        return next(invalidError);  //Call default error handler with status and message
    }

    eventModel.findById(eventId).then(event => {
        
        //If the event exists, and the host is the logged in user, then proceed.
        if(event) {
            if(event.hostName == req.session.user) {
                return next();
            } else { //User is not the author. Throw 401 error.
                let error = new Error("Unauthorized : You are not the host of this event.");
                error.status = 401;
                return next(error);
            }
        } else { //Event not located with specified ID
            let error = new Error("Cannot find an event with the id of " + eventId);
            error.status = 404;
            next(error);
        }
    }).catch(error => { //Error querying database
        next(error);
    })

};

//Verify that that the user is not the host of the event. Otherwise provide a 401 error.
exports.isNotEventHost = (req, res, next) => {

    //Grab the event id from the URL params, query using this data
    let eventId = req.params.id;

    //Id needs to be 24 bits, needs a 24 bit hex id to represent an ObjectID in the database. Check the length of the given ID for at least 24 bits, AND the specific format of HEX
    if(!eventId.match(/^[0-9a-fA-F]{24}$/)) { //If ID does not match a 24 bit hex string (0-9, a-f, A-F, and 24 digits) then create a invalid request error
        let invalidError = new Error("Invalid Event ID!");
        invalidError.status = 400;  //400 (invalid)
        return next(invalidError);  //Call default error handler with status and message
    }

    eventModel.findById(eventId).then(event => {
        
        //If the event exists, and the host is the logged in user, then proceed.
        if(event) {
            if(event.hostName != req.session.user) {
                return next();
            } else { //User is not the author. Throw 401 error.
                let error = new Error("Unauthorized : You are not allowed to RSVP to your own events.");
                error.status = 401;
                return next(error);
            }
        } else { //Event not located with specified ID
            let error = new Error("Cannot find an event with the id of " + eventId);
            error.status = 404;
            next(error);
        }
    }).catch(error => { //Error querying database
        next(error);
    })

};