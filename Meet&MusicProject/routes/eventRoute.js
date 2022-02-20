/*

    Author: Joe Strickland
    Route Module for connections
    Deals with all the routes concerned with connections, 7 RESTful actions
    Date: Feb 19th, 2022

*/

const express = require("express");

const eventRouter = express.Router();            //Create Router object to handle routes

//GET /events musicEvents page
eventRouter.get("/", (req, res)=> {
    res.render("musicEvents");
});

//GET /events/new newMusicEvent page
eventRouter.get("/new", (req, res)=> {
    res.render("newMusicEvent");
});

//POST /events  --> Data received, need to create an event
eventRouter.post("/", (req, res)=> {
    res.send("hi");
});

//GET /events/#number --> Grabs the specific musicEvent page
eventRouter.get("/:id", (req, res)=> {
    res.render("musicEvent");
});

//Get /events/:id/edit --> Sends form to update a musicEvent
eventRouter.get("/:id/edit", (req, res)=> {
    res.render("editMusicEvent");
});

//Put /events/:id --> Updates the musicEvent stored in the database/array specified by id
eventRouter.put("/:id", (req, res)=> {
    res.send("Funny do update");
});

//Delete /events/:id --> Delete the musicEvent stored in the database/array specified by id
eventRouter.delete("/:id", (req, res)=> {
    res.send("delete");
});

module.exports = eventRouter;                    //Export router object to use in app module