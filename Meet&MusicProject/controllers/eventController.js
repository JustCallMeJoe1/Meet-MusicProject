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

        console.log("Event successfully saved to database. Validation successful!");
        res.redirect("/events");
    
    }).catch(error=>{   //Check first for malformatted post request, throw 400 error if form not filled properly. Otherwise, internal database error, pass the error to the error handler as a (500) error!

        //Malformatted input, 400 error path here
        if(error.name === "ValidationError") {
            console.log("User malformatted their submission.");
            error.status = 400; //400 error (Malformatted input)
        } //Otherwise server error (500)
        next(error);

    });
};

//GET /events/#number --> Grabs the specific musicEvent page
exports.getSpecificEvent = (req, res, next) => {

    //Obtain the specific id that was passed from the browser/user
    let chosenId = req.params.id;

    //Id needs to be 24 bits, needs a 24 bit hex id to represent an ObjectID in the database. Check the length of the given ID for at least 24 bits, AND the specific format of HEX
    if(!chosenId.match(/^[0-9a-fA-F]{24}$/)) { //If ID does not match a 24 bit hex string (0-9, a-f, A-F, and 24 digits) then create a invalid request error
        let invalidError = new Error("Invalid Event ID for searching for an event!");
        invalidError.status = 400;  //400 (invalid)
        return next(invalidError);  //Call default error handler with status and message
    }

    //Locate the specific event we are trying to access in the browser
    eventModel.findById(chosenId).then(chosenEvent => {
        //Render the musicEvent page with the specified model object retrieved from the array

        //If story is located, then render it on the browser
        if (chosenEvent) {
            //console.log("Story located, rendering...")
            res.render("musicEvent", {chosenEvent});

        } else {   //If story is not found, then render the error 404 webpage to the user
            let err = new Error("Server was unable to locate an event with the id of " + chosenId);
            err.status = 404;
            next(err);
        }

    }).catch(error=>{ //Database had an internal error when attempting to fetch the specified ID
        next(error);
    });
};

//Get /events/:id/edit --> Sends form to update a musicEvent
exports.getEditForm = (req, res, next) => {

    //Find the specific event so that the details can be passed to the edit form to be filled out
    let eventId = req.params.id;

    //Id needs to be 24 bits, needs a 24 bit hex id to represent an ObjectID in the database. Check the length of the given ID for at least 24 bits, AND the specific format of HEX
    if(!eventId.match(/^[0-9a-fA-F]{24}$/)) { //If ID does not match a 24 bit hex string (0-9, a-f, A-F, and 24 digits) then create a invalid request error
        let invalidError = new Error("Invalid Event ID for editing an event!");
        invalidError.status = 400;  //400 (invalid)
        return next(invalidError);  //Call default error handler with status and message
    }

    //Search the model for the event with the specified ID. If found, render the edit form. Otherwise send a 404 error as the event cannot be located.
    eventModel.findById(eventId).then(pickedEvent => {
        //Error checking for finding id
        if (pickedEvent) {
            return res.render("editMusicEvent", {pickedEvent});

        } else { //404, event not found in database
            let err = new Error("Server was unable to locate an event to edit with the id of " + eventId);
            err.status = 404;
            next(err);

        }
    }).catch(error => { //Database internal error when searching for the event to edit
        next(error);
    })

};

//Put /events/:id --> Updates the musicEvent stored in the database/array specified by id
exports.updateEvent = (req, res, next) => {

    //Get the event needing to be updated by grabbing the object and id from the req params when querying the database
    let oldEvent = req.body;
    oldEvent.featuredEvent = false;
    let oldEventId = req.params.id;

    //console.log(oldEvent);
    //Id needs to be 24 bits, needs a 24 bit hex id to represent an ObjectID in the database. Check the length of the given ID for at least 24 bits, AND the specific format of HEX
    if(!oldEventId.match(/^[0-9a-fA-F]{24}$/)) { //If ID does not match a 24 bit hex string (0-9, a-f, A-F, and 24 digits) then create a invalid request error
        let invalidError = new Error("Invalid Event ID for editing an event!");
        invalidError.status = 400;  //400 (invalid)
        return next(invalidError);  //Call default error handler with status and message
    }

    //Update the story in the model. If an event is returned, then the database has sucessfully updated that event. Otherwise, send a 404 error as the database failed to locate that event.
    eventModel.findByIdAndUpdate(oldEventId, oldEvent, {useFindAndModify : false, runValidators: true}).then(newEvent => {

        //If a new event was returned, then we have successfully updated, redirect to that event page. Otherwise throw a 404 error due to not being found.
        if(newEvent) {
            res.redirect("/events/" + oldEventId);                  
        } else {                                                   
            let err = new Error("Server was unable to locate an event to update with the id of " + oldEventId);
            err.status = 404;
            next(err);
        }
    }).catch(error => {     //Check to see if the input was malformatted, if so then a 400 error has occurred. Otherwise, internal Server error when trying to update the old event. Database has some issue going on.
        if (error.name === "ValidationError") {
            error.status = 400;
            next(error);
        }
        next(error); 
    });

};

//Delete /events/:id --> Delete the musicEvent stored in the database/array specified by id
exports.deleteEvent = (req, res, next) => {
    //Retreive the event ID that needs to be deleted from the params function
    let deleteId = req.params.id;

    //Id needs to be 24 bits, needs a 24 bit hex id to represent an ObjectID in the database. Check the length of the given ID for at least 24 bits, AND the specific format of HEX
    if(!deleteId.match(/^[0-9a-fA-F]{24}$/)) { //If ID does not match a 24 bit hex string (0-9, a-f, A-F, and 24 digits) then create a invalid request error
        let invalidError = new Error("Invalid Event ID for deleting an event!");
        invalidError.status = 400;  //400 (invalid)
        return next(invalidError);  //Call default error handler with status and message
    }

    //Call the event model to delete the specific event. If true, the event has been deleted, if false, an error has occurred
    eventModel.findByIdAndDelete(deleteId, {useFindAndModify: false}).then(deletedEvent => {
        if(deletedEvent) {
            console.log("Event successfully deleted!");                     //Log information, redirect user back to the main events page
            res.redirect("/events");
        } else {        //Throw a 404, resource not found as the event with the Id could not be found
            let err = new Error("Server was unable to locate an event to delete with the id of " + deleteId);
            err.status = 404;
            next(err)
        }
    }).catch(error => {
        next(error);
    });

};