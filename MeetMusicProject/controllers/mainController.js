/*

    Author: Joe Strickland
    Controller Module for general site navigation
    Performs the operation specified by the route regarding site navigation
    Date: Feb 22th, 2022

*/
//Require the music event model so that you may acess the required data to manipulate and use for the website. Import the date formatting helper functions.
const eventModel = require("../models/musicEvent");
const dateFormatting = require("../controllers/dateFunctions");

//GET / index page
exports.index = (req, res, next)=> {

    //Obtain the array of featured events from the model. Find all instances where the field "featuredEvent" is set to true. Return these events to the view and render the index. Otherwise throw an error
    eventModel.find({featuredEvent: true}).then(chosenFeaturedEvents=>{
        res.render("index", {chosenFeaturedEvents});
    }).catch(error=>{ //Internal database error
        console.log("An error has occurred when fetching the featured events!");
        next(error);
    });

};

//GET /contact contact page
exports.getContact = (req, res)=> {
    res.render("contact");
};

//GET /about about page
exports.getAbout = (req, res)=> {
    res.render("about");
};

//Get /#number --> Grabs the specific featuredEvent from the home page
exports.getFeaturedEvent = (req, res, next)=> {

    //Obtain the specific id that was passed from the browser/user
    let chosenId = req.params.id;

    //Obtain the specified event from the model using findById, then use the featuredEvent in the render
    eventModel.findById(chosenId).then(featuredEvent=>{

        //Check to see if an event was fetched or not. If no event was fetched, then create a 404 error.
        if (featuredEvent) {
            console.log("Event located, rendering...")
            
            //Format the date using logic. I am so sorry.
            let formattedYear = featuredEvent.date.substring(0,4);
            
            let monthNumber = featuredEvent.date.substring(5,7);

            let formattedMonth = dateFormatting.convertNumberToMonth(monthNumber);

            let dayNumber = featuredEvent.date.substring(8,10);

            let dayEnding = dateFormatting.convertNumberToPrefix(dayNumber);

            let formattedDate = (`${formattedMonth} ${dayNumber}${dayEnding}, ${formattedYear}`);
            
            let startNumberHour = featuredEvent.startTime.substring(0,2);
            let startNumberMinute = featuredEvent.startTime.substring(3,5);
            let endNumberHour = featuredEvent.endTime.substring(0,2);
            let endNumberMinute = featuredEvent.endTime.substring(3,5);

            let formattedStartHour = dateFormatting.convertTime(startNumberHour);
            let formattedEndHour = dateFormatting.convertTime(endNumberHour);

            let startTimePeriod = dateFormatting.convertPeriod(startNumberHour);
            let endTimePeriod = dateFormatting.convertPeriod(endNumberHour);


            let formattedStartTime = (`${formattedStartHour}:${startNumberMinute} ${startTimePeriod}`);
            let formattedEndTime = (`${formattedEndHour}:${endNumberMinute} ${endTimePeriod}`);

            //Pass a chosenEvent boolean to signal "false", this flag signals to the musicEvent.ejs that this is not an Events music event, but rather a featuredEvent. Pass conversions
            let chosenEvent = false;
            res.render("musicEvent", {featuredEvent, chosenEvent, formattedDate, formattedStartTime, formattedEndTime});
    
        } else {   //If story is not found, then render the error 404 webpage to the user
            let err = new Error("Server was unable to locate a featured event with the id of " + chosenId);
            err.status = 404;
            next(err);
        }
    }).catch(error=>{ //Internal database error when fetching specified featured event
        console.log("Database error when fetching requested featured event.")
        next(error);
    });
};
