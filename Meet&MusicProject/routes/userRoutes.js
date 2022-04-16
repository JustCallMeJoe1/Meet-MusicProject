/*

    Author: Joe Strickland
    Route Module for user related routes
    Deals with all the routes concerned with user actions (logging in, registering, profile)
    Date: April 16th, 2022

*/

const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();            //Create Router object to handle routes

//Get /user/register register page
userRouter.get("/register", userController.getRegister);

//Post /user/register --> Post the new user to the database after checking validation
userRouter.post("/register", userController.createUser);

//Get /user/login login page
userRouter.get("/login", userController.getLogin);

//Post /user/login login page check what user submits as their login creds
userRouter.post("/login", userController.checkLogin);

//Post /user/logout --> Log the user out by destroying their session
userRouter.post("/logout", userController.logout);

//Get profile --> Grab specific user profile
userRouter.get("/profile", userController.getProfile);

module.exports = userRouter;