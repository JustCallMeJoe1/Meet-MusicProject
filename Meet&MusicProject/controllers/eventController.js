/*

    Author: Joe Strickland
    Controller Module for event routes
    Performs the operation specified by the route regarding events, 7 RESTful actions
    Date: Feb 22th, 2022

*/

//Require the music event model so that you may acess the required data to manipulate and use for the website
const eventModel = require("../models/musicEvent");

//GET /events musicEvents page
exports.index = (req, res)=> {

    //Grab events by their specific type. Return the array of (Rock, Metal, Pop) events.
    let rockEvents = eventModel.returnEventByType("Rock");
    let popEvents = eventModel.returnEventByType("Pop");
    let metalEvents = eventModel.returnEventByType("Metal");

    res.render("musicEvents", {rockEvents, popEvents, metalEvents});
};

//GET /events/new newMusicEvent page
exports.newEvent = (req, res)=> {
    res.render("newMusicEvent");
};

//POST /events  --> Data received, need to create an event
exports.createNewEvent = (req, res)=> {
    res.send("hi");
};

//GET /events/#number --> Grabs the specific musicEvent page
exports.getSpecificEvent = (req, res)=> {

    //Obtain the specific id that was passed from the browser/user
    let chosenId = req.params.id;

    //Locate the specific event we are trying to access in the browser
    let chosenEvent = eventModel.returnEventById(chosenId);

    //Render the musicEvent page with the specified model object retrieved from the array

    //If story is located, then render it on the browser
    if (chosenEvent) {
    //    console.log("Story located, rendering...")
        res.render("musicEvent", {chosenEvent});
    } else {   //If story is not found, then render the error 404 webpage to the user
        res.status(404).send("PROGRAM ERROR HANDLING HERE");
    }
    
    
};

//Get /events/:id/edit --> Sends form to update a musicEvent
exports.getEditForm = (req, res)=> {
    res.render("editMusicEvent");
};

//Put /events/:id --> Updates the musicEvent stored in the database/array specified by id
exports.updateEvent = (req, res)=> {
    res.send("Funny do update");
};

//Delete /events/:id --> Delete the musicEvent stored in the database/array specified by id
exports.deleteEvent = (req, res)=> {
    res.send("delete");
};