/*

    Author: Joe Strickland
    Controller Module for general site navigation
    Performs the operation specified by the route regarding site navigation
    Date: Feb 22th, 2022

*/
//Require the music event model so that you may acess the required data to manipulate and use for the website
const eventModel = require("../models/musicEvent");

//GET / index page
exports.index = (req, res)=> {

    //Obtain the array of featured events from the model 
    let chosenFeaturedEvents = eventModel.returnIsFeatured(true);

    res.render("index", {chosenFeaturedEvents});
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
exports.getFeaturedEvent = (req, res)=> {

    //Obtain the specific id that was passed from the browser/user
    let chosenId = req.params.id;

    //Obtain the array of featured events from the model 
    let chosenFeaturedEvents = eventModel.returnIsFeatured(true);

    //Locate the specific featured Event in the featured Array from the model
    let featuredEvent = chosenFeaturedEvents.find(e => (e.id === chosenId));

    //If story is located, then render it on the browser
    if (featuredEvent) {
        //console.log("Story located, rendering...")

        //Pass a chosenEvent boolean to signal "false", this flag signals to the musicEvent.ejs that this is not an Events music event, but rather a featuredEvent
        let chosenEvent = false;
        res.render("musicEvent", {featuredEvent, chosenEvent});

    } else {   //If story is not found, then render the error 404 webpage to the user
        res.status(404).send("PROGRAM ERROR HANDLING HERE");
    }

};
