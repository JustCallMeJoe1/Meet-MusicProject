/*

    Author: Joe Strickland
    Route Module for connections
    Deals with all the routes concerned with connections, 7 RESTful actions
    Date: Feb 19th, 2022

*/

const express = require("express");
const eventController = require("../controllers/eventController");
const { isLoggedIn, isEventHost, isNotEventHost } = require("../middlewares/authorizeRules");
const { validateEvent, validateErrors, validateRSVP } = require("../middlewares/validator");

const eventRouter = express.Router();            //Create Router object to handle routes

//GET /events musicEvents page
eventRouter.get("/", eventController.index);

//GET /events/new newMusicEvent page
eventRouter.get("/new", isLoggedIn, eventController.newEvent);

//POST /events  --> Data received, need to create an event
eventRouter.post("/", isLoggedIn, validateEvent, validateErrors, eventController.createNewEvent);

//GET /events/#number --> Grabs the specific musicEvent page
eventRouter.get("/:id", eventController.getSpecificEvent);

//Get /events/:id/edit --> Sends form to update a musicEvent
eventRouter.get("/:id/edit", isLoggedIn, isEventHost, eventController.getEditForm);

//Put /events/:id --> Updates the musicEvent stored in the database/array specified by id
eventRouter.put("/:id", isLoggedIn, isEventHost, validateEvent, validateErrors, eventController.updateEvent);

//Delete /events/:id --> Delete the musicEvent stored in the database/array specified by id
eventRouter.delete("/:id", isLoggedIn, isEventHost, eventController.deleteEvent);

//POST /events/:id/rsvp --> Post request to send RSVP status for current user for this current connection
eventRouter.post("/:id/rsvp", isLoggedIn, isNotEventHost, validateRSVP, validateErrors, eventController.rsvpEvent);

module.exports = eventRouter;                    //Export router object to use in app module