/*

    Author: Joe Strickland
    Controller Module for general site navigation
    Performs the operation specified by the route regarding site navigation
    Date: Feb 22th, 2022

*/
//Require the music event model so that you may acess the required data to manipulate and use for the website
const eventModel = require("../models/musicEvent");

//GET / index page
exports.index = (req, res, next)=> {

    //Obtain the array of featured events from the model. Find all instances where the field "featuredEvent" is set to true. Return these events to the view and render the index. Otherwise throw an error
    eventModel.find({featuredEvent: true}).then(chosenFeaturedEvents=>{
        res.render("index", {chosenFeaturedEvents});
    }).catch(error=>{ //Internal database error
        console.log("An error has occurred when fetching the featured events!");
        next(error);
    });

};

//GET /contact contact page
exports.getContact = (req, res)=> {
    res.render("contact");
};

//GET /about about page
exports.getAbout = (req, res)=> {
    res.render("about");
};

//Get /#number --> Grabs the specific featuredEvent from the home page
exports.getFeaturedEvent = (req, res, next)=> {

    //Obtain the specific id that was passed from the browser/user
    let chosenId = req.params.id;

    //Id needs to be 24 bits, needs a 24 bit hex id to represent an ObjectID in the database. Check the length of the given ID for at least 24 bits, AND the specific format of HEX
    if(!chosenId.match(/^[0-9a-fA-F]{24}$/)) { //If ID does not match a 24 bit hex string (0-9, a-f, A-F, and 24 digits) then create a invalid request error
        let invalidError = new Error("Invalid Story ID!");
        invalidError.status = 400;  //400 (invalid)
        return next(invalidError);  //Call default error handler with status and message
    }

    //Obtain the specified event from the model using findById, then use the featuredEvent in the render
    eventModel.findById(chosenId).then(featuredEvent=>{

        //Check to see if an event was fetched or not. If no event was fetched, then create a 404 error.
        if (featuredEvent) {
            console.log("Story located, rendering...")
    
            //Pass a chosenEvent boolean to signal "false", this flag signals to the musicEvent.ejs that this is not an Events music event, but rather a featuredEvent
            let chosenEvent = false;
            res.render("musicEvent", {featuredEvent, chosenEvent});
    
        } else {   //If story is not found, then render the error 404 webpage to the user
            let err = new Error("Server was unable to locate a featured event with the id of " + chosenId);
            err.status = 404;
            next(err);
        }
    }).catch(error=>{ //Internal database error when fetching specified featured event
        console.log("Database error when fetching requested featured event.")
        next(error);
    });
};
