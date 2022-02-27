/*

    Author: Joe Strickland
    App JavaScript file for initializing application and hosting services
    Date: Feb 19th, 2022

*/

//Require third party NPM packages so that they may be used throughout the application
const express = require("express");
const morgan = require("morgan");
const eventRoutes = require("./routes/eventRoute");
const mainRoutes = require("./routes/mainRoute");
const methodOverride = require("method-override");

//Create Application instance so that it may be run on a webserver (LocalHost) in this case.
const app = express();              //Creates an express application

//Configure application instance settings so that app runs correctly
const host = "localhost";           //Host config (localhost)
let port = 3000;                    //Port number on lcoalhost (3000)
app.set("view engine", "ejs");      //View engine used for application : EJS           


//Mount application middleware functions that will be used throughout the application to perform actions
app.use(express.static("public"));                  //Connect webserver to static resources in project, be able to connect to static files
app.use(express.urlencoded({extended : true}));     //Be able to parse data from request body, meaning we can receive form data from browser (POST)
app.use(morgan("tiny"));                            //Logger for requests in the terminal, shows client request information
app.use(methodOverride("_method"));                 //Package allowing PUT and DELETE request in HTML forms

//Set up initial Routing to different webpages throughout the web server

//General Site Navigation (Use mainRoutes)
app.use("/", mainRoutes);               //Routes with general site

//Event related Site navigation (Use eventRoutes)
app.use("/events", eventRoutes);        //Routes to event related site

app.use((req, res, next) => {                  //Error handling middleware (404)
    let err = new Error("Server cannot locate the file specified by the user via " + req.url);
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {                  //Error handling middleware (500)
    console.log(err.stack)                          //Print out the error stack to the console so that the developer may debugg the system
    if(!err.status) {                               //If an error code has not been set, then default it to 500 (Server error)
        err.status = 500;
        err.message = ("Internal Server error - Server was unable to process request!");
    }

    res.status(err.status);                         //Set the response status as the error status
    res.render("error", {error: err});              //Render the error template with the error object

});

//Start the web application server on localhost with specific port number
app.listen(port, host, ()=> {
    console.log("Server started on " + host + " with port " + port + " .");     //Just log that the server has started
});