/*

    Author: Joe Strickland
    Controller Module for event routes
    Performs the operation specified by the route regarding events, 7 RESTful actions
    Date: Feb 22th, 2022

*/

//GET /events musicEvents page
exports.index = (req, res)=> {
    res.render("musicEvents");
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
    res.render("musicEvent");
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