/*

    Author: Joe Strickland
    Route Module for connections
    Deals with all the routes concerned with connections, 7 RESTful actions
    Date: Feb 19th, 2022

*/

const express = require("express");
const eventController = require("../controllers/eventController")

const eventRouter = express.Router();            //Create Router object to handle routes

//GET /events musicEvents page
eventRouter.get("/", eventController.index);

//GET /events/new newMusicEvent page
eventRouter.get("/new", eventController.newEvent);

//POST /events  --> Data received, need to create an event
eventRouter.post("/", eventController.createNewEvent);

//GET /events/#number --> Grabs the specific musicEvent page
eventRouter.get("/:id", eventController.getSpecificEvent);

//Get /events/:id/edit --> Sends form to update a musicEvent
eventRouter.get("/:id/edit", eventController.getEditForm);

//Put /events/:id --> Updates the musicEvent stored in the database/array specified by id
eventRouter.put("/:id/", eventController.updateEvent);

//Delete /events/:id --> Delete the musicEvent stored in the database/array specified by id
eventRouter.delete("/:id", eventController.deleteEvent);

module.exports = eventRouter;                    //Export router object to use in app module