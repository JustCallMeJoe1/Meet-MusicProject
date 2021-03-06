/*

    Author: Joe Strickland
    Model file to store object literals that will represent the data. Also includes interface to manipulate the data.
    Date: Feb 19th, 2022

*/

// ****DEPRECATED SINCE MOVING TO MONGO IMPLEMENTATION*****
// 9 Music Event objects stored in musicEvents page, 9 Featured music events on index page
// musicEvents[0-8] will represent the musicEvents objects on the musicEvent page, musicEvents[9-17] will represent the featuredEvents on the index page
// ****DEPRECATED SINCE MOVING TO MONGO IMPLEMENTATION*****

/* Object Schema for mongoose database (Validators detailed below)
    connection id– unique identifier for the connection (objectId) (Provided by mongoose)
    connection name (String)
    connection topic - this is the category/topic that will be used to select or arrange connection by section or type in the connections view. (String)
    details (String)
    date - STORE IN HTML UTC (dumb) format (String formatted correctly)
    start time - STORE IN HTML UTC (dumb) format (String formatted correctly)
    end time - STORE IN HTML UTC (dumb) format (String formatted correctly)
    host name (String)
    location (string)
    image - since we did not cover file upload to server, you may store an image url for this. The image should still be rendered in the view. (URL String)
    featuredEvent - Boolean, specified by me when creating the database or provided in the controller when a user submits a story (Defaulted to false)
*/

/* Object Schema Validation 
    connection id - Provided by mongoose when created
    connection name - Required, length minimum of 1, maximum of 50 *
    connection topic - Required, length minimum of 1, maximum of 50 *
    details - Required, minimum of 5, maximum of 500 *
    date - Required. Format into a specific format with regex (YYYY-MM-DDDD) Y=year, M=Month, D=Day *
    start time - Required. Format into a specific format with regex (HH:MM), H=hour, M=minute * 
    end time - Required. Format into a specific format with regex (HH:MM), H=hour, M=minute *
    hostName - Required. Minlength = 1, MaxLength = 50 *
    image - Required. *
    location - Required. Minlength = 1, MaxLength = 150 *
    featuredEvent - Just provide it in the controller after submitted from the user, will automatically be set to false (Not required but will be provided by controller or generated by me)
*/

//Require all neccessary packages to be used within the model, derive anything from those packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create a musicEvent database schema for the collection
const musicEventSchema = new Schema({
    name: {
        type: String, 
        required: [true, "The name of the event is required!"], 
        minlength: [1, "Name field must have at least 10 characters"],
        maxlength: [50, "Name field can have at most 50 characters"]
    },
    topic: {
        type: String, 
        required: [true, "The music category is required!"],
        minlength: [1, "Topic field must have at least 10 characters"],
        maxlength: [50, "Topic field can have at most 50 characters"]
    },
    details: {
        type: String, 
        required: [true, "The music event detail information is required!"],
        minlength: [5, "Details field must have at least 5 characters"],
        maxlength: [900, "Details field can have at most 150 characters"]
    },
    date: {
        type: String, 
        required: [true, "The date of the event is required!"],
        match: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/  //REGEX to ensure that the date will be YYYY-MM-DD format, Year is just 4 digits, Month is 01-12, and day is 00-31
    },
    startTime: {
        type: String,
        required: [true, "The start time of the event is required!"], 
        match: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/         //REGEX to ensure that the time will be in HH-MM format, where HH can be 0-23 and MM can be 0-59
    },
    endTime: {
        type: String, 
        required: [true, "The end time of the event is required!"],
        match: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/         //REGEX to ensure that the time will be in HH-MM format, where HH can be 0-23 and MM can be 0-59
    },
    hostName: {                              //Data modelling to link together users and musicEvents. One user can have many musicEvents as a host
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    location: {
        type: String, 
        required: [true, "The location of the event is required for an event!"],
        minlength: [1, "Location field must have at least 5 characters"],
        maxlength: [150, "Location field can have at most 50 characters"]
    },
    image: {
        type: String, 
        required: [true, "An image URL is required to showcase the event!"]
    },
    featuredEvent: {
        type: Boolean,
        required: [true, "You forgot to set something up Joe"]
    }
});

//Create a collection named events in the database using the musicEventSchema. Export this model so that the controller may use it
module.exports = mongoose.model("event", musicEventSchema);