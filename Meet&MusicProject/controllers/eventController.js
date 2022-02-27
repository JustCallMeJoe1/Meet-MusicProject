/*

    Author: Joe Strickland
    Controller Module for event routes
    Performs the operation specified by the route regarding events, 7 RESTful actions
    Date: Feb 22th, 2022

*/

//Require the music event model so that you may acess the required data to manipulate and use for the website
const e = require("express");
const eventModel = require("../models/musicEvent");

//GET /events musicEvents page --> Render the events page with all the different kinds of events, every topic is rendered correctly
exports.index = (req, res) => {

    //Grab events by their specific type. Return the array of (Rock, Metal, Pop) events.
    let rockEvents = eventModel.returnEventByType("Rock");
    let popEvents = eventModel.returnEventByType("Pop");
    let metalEvents = eventModel.returnEventByType("Metal");

    res.render("musicEvents", {rockEvents, popEvents, metalEvents});
};

//GET /events/new newMusicEvent page --> Render the new event form page HTML
exports.newEvent = (req, res) => {
    res.render("newMusicEvent");
};

//POST /events  --> Data received, need to create an event
exports.createNewEvent = (req, res) => {
    //Testing purposes...
    //console.log(req.body);
    
    //Create a new event object from the user submitted form
    let submittedEvent = req.body;
    eventModel.addMusicEvent(submittedEvent);
    res.redirect("/events")

};

//GET /events/#number --> Grabs the specific musicEvent page
exports.getSpecificEvent = (req, res) => {

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
exports.getEditForm = (req, res) => {

    //Find the specific event so that the details can be passed to the edit form to be filled out
    let eventId = req.params.id;
    let pickedEvent = eventModel.returnEventById(eventId);

    //Error checking for finding id
    if (pickedEvent) {
        res.render("editMusicEvent", {pickedEvent});
    } else {
        res.status(404).send("PROGRAM ERROR HANDLING HERE");
    }

};

//Put /events/:id --> Updates the musicEvent stored in the database/array specified by id
exports.updateEvent = (req, res) => {

    //Get the event needing to be updated by grabbing the object and id from the req params
    let oldEvent = req.body;
    let oldEventId = req.params.id;

    //console.log(oldEvent);

    //Update the story in the model (conditional to error check)
    if (eventModel.updateEventById(oldEventId, oldEvent)) {
        res.redirect("/events/" + oldEventId);                  //Redirect to that event that was just updated
    } else {                                                    //Unable to update object!
        res.status(404).send("PROGRAM ERROR HANDLING HERE");
    }

};

//Delete /events/:id --> Delete the musicEvent stored in the database/array specified by id
exports.deleteEvent = (req, res) => {
    //Retreive the event ID that needs to be deleted from the params function
    let deleteId = req.params.id;

    //Call the event model to delete the specific event. If true, the event has been deleted, if false, an error has occurred
    if (eventModel.deleteById(deleteId)) {                                               
        console.log("Event successfully deleted!");                     //Log information, redirect user back to the main events page
        res.redirect("/events");
    } else {                                                            //Throw a specific error into the error HTML page
        res.status(404).send("PROGRAM ERROR HANDLING HERE");
    }

};