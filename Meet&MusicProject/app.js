/*

    Author: Joe Strickland
    App JavaScript file for initializing application and hosting services
    Date: Feb 19th, 2022

*/

//Require third party NPM packages so that they may be used throughout the application
const express = require("express");
const morgan = require("morgan");


//Create Application instance so that it may be run on a webserver (LocalHost) in this case.
const app = express();              //Creates an express application

//Configure application instance settings so that app runs correctly
const host = "localhost";           //Host config (localhost)
let port = 3000;                    //Port number on lcoalhost (3000)
app.set("view engine", "ejs");      //View engine used for application : EJS           


//Mount application middleware functions that will be used throughout the application to perform actions




//Set up initial Routing to different webpages throughout the web server




//Start the web application server on localhost with specific port number