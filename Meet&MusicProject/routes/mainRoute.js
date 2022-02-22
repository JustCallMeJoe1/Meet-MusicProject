/*

    Author: Joe Strickland
    Route Module for general site navigation
    Date: Feb 19th, 2022

*/

const express = require("express");
const mainController = require("../controllers/mainController");

const mainRouter = express.Router();            //Create Router object to handle routes

//GET / index page
mainRouter.get("/", mainController.index);

//GET /contact contact page
mainRouter.get("/contact", mainController.getContact);

//GET /about about page
mainRouter.get("/about", mainController.getAbout);

//Get /#number --> Grabs the specific featuredEvent from the home page
mainRouter.get("/featuredEvent/:id", mainController.getFeaturedEvent);

module.exports = mainRouter;                    //Export router object to use in app module