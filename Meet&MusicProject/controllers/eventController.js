/*

    Author: Joe Strickland
    Controller Module for event routes
    Performs the operation specified by the route regarding events, 7 RESTful actions
    Date: Feb 22th, 2022

*/

//Require the music event model so that you may acess the required data to manipulate and use for the website
const eventModel = require("../models/musicEvent");

//GET /events musicEvents page --> Render the events page with all the different kinds of events, every topic is rendered correctly
exports.index = (req, res, next) => {

    //Array to hold all the categories from each event in the database
    let totalCategories = [];
    
    //Temp array to hold all unique categories
    let uniqueArray;

    //Set to hold all categories (Unique)
    let allCategories;

    //Grab all music events, also grab all present categories in the model. Pass this information to the view.
    eventModel.find({featuredEvent: false}).then(allMusicEvents=>{

        //For each event push in their respective categoriy into totalCategories array
        allMusicEvents.forEach(event => {
            totalCategories.push(event.topic);
        });

        //Create an array of the set that will hold these categories (Spread them across the Set)
        uniqueArray = [...new Set(totalCategories)];

        //Finally, create the unique set of categories by creating a set from the uniqueArray of categories. allCategories will hold the unique Set
        allCategories = new Set(uniqueArray);

        //Testing for printing. What information is being sent to the view?
        //console.log(allMusicEvents);
        //console.log(allCategories);

        res.render("musicEvents", {allMusicEvents, allCategories});

    }).catch(error => { //Error when fetching all events and their categories. Internal Server error (500)
        next(error);
    });

};

//GET /events/new newMusicEvent page --> Render the new event form page HTML
exports.newEvent = (req, res) => {
    res.render("newMusicEvent");
};

//POST /events  --> Data received, need to create an event
exports.createNewEvent = (req, res, next) => {
    //Testing purposes...
    //console.log(req.body);
    
    //Create a new event object from the user submitted form
    let submittedEvent = new eventModel(req.body);  //Create a new music event object based on the model class (Submitted event is an instance)
    submittedEvent.featuredEvent = false;           //New events are defaulted to not featured. This will satisfy the schema

    //Save the story to the model, if successful then redirect the user back to the main events page, otherwise throw a database error!
    submittedEvent.save().then(()=>{

        console.log("Story successfully saved to database. Validation successful!")
        res.redirect("/events")
    
    }).catch(error=>{   //Check first for malformatted post request, throw 400 error if form not filled properly. Otherwise, internal database error, pass the error to the error handler as a (500) error!

        //Malformatted input, 400 error path here
        if(error.name === "ValidationError") {
            error.status = 400; //400 error (Malformatted input)
        } //Otherwise server error (500)
        next(error);

    });
};

//GET /events/#number --> Grabs the specific musicEvent page
exports.getSpecificEvent = (req, res, next) => {

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
        let err = new Error("Server was unable to locate an event with the id of " + chosenId);
        err.status = 404;
        next(err);
    }
    
    
};

//Get /events/:id/edit --> Sends form to update a musicEvent
exports.getEditForm = (req, res, next) => {

    //Find the specific event so that the details can be passed to the edit form to be filled out
    let eventId = req.params.id;
    let pickedEvent = eventModel.returnEventById(eventId);

    //Error checking for finding id
    if (pickedEvent) {
        res.render("editMusicEvent", {pickedEvent});
    } else {
        let err = new Error("Server was unable to locate an event to edit with the id of " + eventId);
        err.status = 404;
        next(err);
    }

};

//Put /events/:id --> Updates the musicEvent stored in the database/array specified by id
exports.updateEvent = (req, res, next) => {

    //Get the event needing to be updated by grabbing the object and id from the req params
    let oldEvent = req.body;
    let oldEventId = req.params.id;

    //console.log(oldEvent);

    //Update the story in the model (conditional to error check)
    if (eventModel.updateEventById(oldEventId, oldEvent)) {
        res.redirect("/events/" + oldEventId);                  //Redirect to that event that was just updated
    } else {                                                    //Unable to update object!
        let err = new Error("Server was unable to locate an event to update with the id of " + oldEventId);
        err.status = 404;
        next(err);
    }

};

//Delete /events/:id --> Delete the musicEvent stored in the database/array specified by id
exports.deleteEvent = (req, res, next) => {
    //Retreive the event ID that needs to be deleted from the params function
    let deleteId = req.params.id;

    //Call the event model to delete the specific event. If true, the event has been deleted, if false, an error has occurred
    if (eventModel.deleteById(deleteId)) {                                               
        console.log("Event successfully deleted!");                     //Log information, redirect user back to the main events page
        res.redirect("/events");
    } else {                                                            //Throw a specific error into the error HTML page
        let err = new Error("Server was unable to locate an event to delete with the id of " + deleteId);
        err.status = 404;
        next(err);
    }

};