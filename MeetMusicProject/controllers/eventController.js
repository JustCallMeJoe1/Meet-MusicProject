/*

    Author: Joe Strickland
    Controller Module for event routes
    Performs the operation specified by the route regarding events, 7 RESTful actions
    Date: Feb 22th, 2022

*/

//Require the music event model so that you may acess the required data to manipulate and use for the website. Require conversion functions
const eventModel = require("../models/musicEvent");
const rsvpModel = require("../models/rsvp");
const dateFormatting = require("../controllers/dateFunctions");
const validator = require("validator");

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
            totalCategories.push(validator.unescape(event.topic));

            //Unescape all strings to be displayed to browser
            event.name = validator.unescape(event.name);
            event.topic = validator.unescape(event.topic);
            event.details = validator.unescape(event.topic);
            event.location = validator.unescape(event.location);
            event.image = validator.unescape(event.image);

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

    //Grab the userID who created this event (The user in session)
    submittedEvent.hostName = req.session.user;

    submittedEvent.featuredEvent = false;           //New events are defaulted to not featured. This will satisfy the schema

    //Save the story to the model, if successful then redirect the user back to the main events page, otherwise throw a database error!
    submittedEvent.save().then(()=>{
        req.flash("success", "Event successfully created on website. Validation successful!");
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
    eventModel.findById(chosenId).populate("hostName", "firstName lastName").then(chosenEvent => {
        //Render the musicEvent page with the specified model object retrieved from the array
        let rsvpCounter = 0;

        //If story is located, then render it on the browser
        if (chosenEvent) {
            //console.log("Story located, rendering...")

            //Format the date using logic. I am so sorry.
            let formattedYear = chosenEvent.date.substring(0,4);
            
            let monthNumber = chosenEvent.date.substring(5,7);

            let formattedMonth = dateFormatting.convertNumberToMonth(monthNumber);

            let dayNumber = chosenEvent.date.substring(8,10);

            let dayEnding = dateFormatting.convertNumberToPrefix(dayNumber);

            let formattedDate = (`${formattedMonth} ${dayNumber}${dayEnding}, ${formattedYear}`);
            
            let startNumberHour = chosenEvent.startTime.substring(0,2);
            let startNumberMinute = chosenEvent.startTime.substring(3,5);
            let endNumberHour = chosenEvent.endTime.substring(0,2);
            let endNumberMinute = chosenEvent.endTime.substring(3,5);

            let formattedStartHour = dateFormatting.convertTime(startNumberHour);
            let formattedEndHour = dateFormatting.convertTime(endNumberHour);

            let startTimePeriod = dateFormatting.convertPeriod(startNumberHour);
            let endTimePeriod = dateFormatting.convertPeriod(endNumberHour);


            let formattedStartTime = (`${formattedStartHour}:${startNumberMinute} ${startTimePeriod}`);
            let formattedEndTime = (`${formattedEndHour}:${endNumberMinute} ${endTimePeriod}`);

            //Locate the event within the RSVP collection to see how many people are RSVP with yes
            rsvpModel.find({ eventRSVP: chosenId }).then(RSVPs => {

                //For each found, check to see how many are "Yes". Increase counter with each Yes and return it to the view.
                RSVPs.forEach(e => {
                    if(e.statusRSVP == "yes") {
                        rsvpCounter += 1;
                    }
                });
                
                //Unescape all validated characters
                chosenEvent.name = validator.unescape(chosenEvent.name);
                chosenEvent.topic = validator.unescape(chosenEvent.topic);
                chosenEvent.details = validator.unescape(chosenEvent.details);
                chosenEvent.location = validator.unescape(chosenEvent.location);
                chosenEvent.image = validator.unescape(chosenEvent.image);

                //Render the view with all the collected event information.
                res.render("musicEvent", {chosenEvent, formattedDate, formattedStartTime, formattedEndTime, rsvpCounter});

            }).catch(error => {
                console.log("Error locating the RSVPs to this event.");
                next(error);
            });

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

    //Search the model for the event with the specified ID. If found, render the edit form. Otherwise send a 404 error as the event cannot be located.
    eventModel.findById(eventId).then(pickedEvent => {

        //Unescaping funny characters
        pickedEvent.name = validator.unescape(pickedEvent.name);
        pickedEvent.topic = validator.unescape(pickedEvent.topic);
        pickedEvent.details = validator.unescape(pickedEvent.details);
        pickedEvent.location = validator.unescape(pickedEvent.location);
        pickedEvent.image = validator.unescape(pickedEvent.image);

        return res.render("editMusicEvent", {pickedEvent});
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

    //Update the story in the model. If an event is returned, then the database has sucessfully updated that event. Otherwise, send a 404 error as the database failed to locate that event.
    eventModel.findByIdAndUpdate(oldEventId, oldEvent, {useFindAndModify : false, runValidators: true}).then(newEvent => {
        req.flash("success", "Event successfully updated!");
        res.redirect("/events/" + oldEventId);                  
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

    //Retrieve the RSVPs associated with the deleted event. For each one located, delete it.
    rsvpModel.find({ eventRSVP: deleteId }).then(events => {
        events.forEach(e => {
            rsvpModel.findByIdAndDelete(e.id).then(() =>{
                console.log("Event deleted.");
            }).catch(error => {
                console.log("Error when deleting events.");
                next(error);
            });
        });
    }).catch(error => { //Error locating the events to delete.
        console.log("Error locating events to delete.");
        next(error);
    });

    //Call the event model to delete the specific event. If true, the event has been deleted, if false, an error has occurred
    eventModel.findByIdAndDelete(deleteId, {useFindAndModify: false}).then(deletedEvent => {
        req.flash("success","Event successfully deleted!");                     //Log information, redirect user back to the main events page
        res.redirect("/events");
    }).catch(error => {
        next(error);
    });

};

//Post /events/:id/rsvp --> Update the status of the user's RSVP for this specific event they have RSVP responded too.
exports.rsvpEvent = (req, res, next) => {
    //Retrieve the event ID that the user is RSVPing to. Retrieve the UserId as well.
    let eventId = req.params.id;
    let userId = req.session.user;
    
    //First, see if there is an RSVP that exists. If it does exist, then just update the status. If it doesnt exist, then create one. findOneAndUpdate + upset = insane! If an object is returned, something existed!!!
    rsvpModel.findOneAndUpdate({ userRSVP: userId, eventRSVP: eventId }, { statusRSVP: req.body.statusRSVP }, { upsert: true }).then(updatedRSVP => {

        //If something was returned, that means that an RSVP exists. Flash that its been updated.
        if(updatedRSVP) {
            req.flash("success", "Event RSVP Status sucessfully updated!");
            res.redirect("/user/profile");
        } else { //No returned object means that it did not exist. Flash that its been created.
            req.flash("success", "Event RSVP Status sucessfully created!");
            res.redirect("/user/profile");
        }
    }).catch(error => { //General error handler for error in mongo
        console.log("Some error occurred when updating RSVP Status for user.");
        next(error);
    });
};