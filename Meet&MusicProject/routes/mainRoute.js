/*

    Author: Joe Strickland
    Route Module for general site navigation
    Date: Feb 19th, 2022

*/

const express = require("express");

const mainRouter = express.Router();            //Create Router object to handle routes

//GET / index page
mainRouter.get("/", (req, res)=> {
    res.render("index");
});

//GET /contact contact page
mainRouter.get("/contact", (req, res)=> {
    res.render("contact");
});

//GET /about about page
mainRouter.get("/about", (req, res)=> {
    res.render("about");
});

//Get /#number --> Grabs the specific featuredEvent from the home page
mainRouter.get("/featuredEvent/:id", (req, res)=> {
    res.render("musicEvent");
});

module.exports = mainRouter;                    //Export router object to use in app module