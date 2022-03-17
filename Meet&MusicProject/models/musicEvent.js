/*

    Author: Joe Strickland
    Model file to store object literals that will represent the data. Also includes interface to manipulate the data.
    Date: Feb 19th, 2022

*/

// 9 Music Event objects stored in musicEvents page, 9 Featured music events on index page
// musicEvents[0-8] will represent the musicEvents objects on the musicEvent page, musicEvents[9-17] will represent the featuredEvents on the index page

/* Object Schema
    connection id– unique identifier for the connection
    connection name 
    connection topic - this is the category/topic that will be used to select or arrange connection by section or type in the connections view.
    details
    date - Using luxon
    start time - Using luxon
    end time - using luxon
    host name
    image - since we did not cover file upload to server, you may store an image url for this. The image should still be rendered in the view.
*/
const { DateTime } = require("luxon");  //Third party luxon module for DateTime manipulation
const {v4: uuidv4} = require("uuid");     //Third party uuid module for creating a unique id that will be assigned to new stories. These id's will allow for unique linking

const musicEvents = [
    {
        //Start of Preloaded events (Music Events) objects
        id: "1",
        name: "Ozzy Ozbourne Tour Revamp",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: "17-Mar-1970",                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: "04:00",     
        endTime: "07:00",
        hostName: "Ozzy Ozbourne",
        location: "Arena, United Kingdom, London",
        image: "https://cdn.smehost.net/ozzycom-uslegacyprod/wp-content/uploads/2019/05/Ozzy_NoMoreTours2_1200px2.jpg",
        featuredEvent: false
    },
    {
        id: "2",
        name: "David Bowie Tour Revamp - NC",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2020, 6, 12).toLocaleString(DateTime.DATE_HUGE),                   //Luxon npm package with localeString DATETIME_SHORT
        startTime: "5:00PM",     
        endTime: "9:00PM",
        hostName: "David Bowie",
        location: "PNC Arena, Charlotte, NC",
        image: "https://i.ytimg.com/vi/JFHC6t13hi0/maxresdefault.jpg",
        featuredEvent: false
    },
    {
        id: "3",
        name: "Local Rock Fest 2022",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 8, 11).toLocaleString(DateTime.DATE_HUGE),                    //Luxon npm package with localeString DATETIME_SHORT
        startTime: "5:00PM",     
        endTime: "9:00PM",
        hostName: "RockCharlotte",
        location: "Backyard, Cary, NC",
        image: "https://i.guim.co.uk/img/media/ad98f2dc808f18131e35e59c05ba6212671e8227/94_0_3061_1838/master/3061.jpg?width=620&quality=85&auto=format&fit=max&s=b72df2817ace7d67acf0a1ff9c218a03",
        featuredEvent: false
    },
    {
        id: "4",
        name: "Pop Convention 2022",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2023, 8, 11).toLocaleString(DateTime.DATE_HUGE),                   //Luxon npm package with localeString DATETIME_SHORT
        startTime: "6:00PM",     
        endTime: "12:00AM",
        hostName: "PopNC",
        location: "Convention Center, Raleigh, NC",
        image: "https://res.cloudinary.com/jerrick/image/upload/f_jpg,fl_progressive,q_auto,w_1024/nl40rblansd92a0diypp.jpg",
        featuredEvent: false
    },
    {
        id: "5",
        name: "Generic Music 2012",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2012, 8, 11).toLocaleString(DateTime.DATE_HUGE),                   //Luxon npm package with localeString DATETIME_SHORT
        startTime: "5:00PM",     
        endTime: "7:00PM",
        hostName: "2012Classics",
        location: "Convention Center, Raleigh, NC",
        image: "https://prism.fm/wp-content/uploads/2020/09/crowd-live-music.jpg",
        featuredEvent: false
    },
    {
        id: "6",
        name: "Pop Festival - Denver",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2015, 8, 11).toLocaleString(DateTime.DATE_HUGE),                    //Luxon npm package with localeString DATETIME_SHORT
        startTime: "4:00PM",     
        endTime: "7:00PM",
        hostName: "DenverMusic",
        location: "Denver Arena, NC",
        image: "https://www.gannett-cdn.com/presto/2021/09/19/PMJS/1e1c662a-6f36-4807-9ce4-98aba395bd42-Photo_Sep_18_9_57_38_AM.jpg?crop=6719,3780,x0,y672&width=3200&height=1801&format=pjpg&auto=webp",
        featuredEvent: false
    },
    {
        id: "7",
        name: "MetalFest: Charlotte 2022",
        topic: "Metal",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 12, 11).toLocaleString(DateTime.DATE_HUGE),                   //Luxon npm package with localeString DATETIME_SHORT
        startTime: "7:00PM",     
        endTime: "11:00PM",
        hostName: "MetalFest",
        location: "PNC Arena, Charlotte, NC",
        image: "https://www.mastersofrock.cz/catalog/view/theme/metalfest/assets/img/slide01.jpg",
        featuredEvent: false
    },
    {
        id: "8",
        name: "Metal Concert - Charlotte",
        topic: "Metal",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2018, 12, 11).toLocaleString(DateTime.DATE_HUGE),                    //Luxon npm package with localeString DATETIME_SHORT
        startTime: "4:00PM",     
        endTime: "7:00PM",
        hostName: "UndergroundMetal",
        location: "PNC Arena, Charlotte, NC",
        image: "https://chasingthelightart.s3.eu-central-1.amazonaws.com/wp-content/uploads/20191018125006/Walkways-2019-08-31-23-10-11-5706-4-696x464.jpg",
        featuredEvent: false
    },
    {
        id: "9",
        name: "RTP Metal - NC",
        topic: "Metal",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2019, 12, 11).toLocaleString(DateTime.DATE_HUGE),                   //Luxon npm package with localeString DATETIME_SHORT
        startTime: "7:00PM",     
        endTime: "11:00PM",
        hostName: "RTPMetalScene",
        location: "Convention Center, Raleigh, NC",
        image: "https://www.theclandestined.com/wp-content/uploads/2020/11/XBSFfT-563x353.jpg",
        featuredEvent: false
    },
    //Start of Featured Events (Index Page) objects
    {
        id: "1",
        name: "Music Festival",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2019, 12, 11).toLocaleString(DateTime.DATE_HUGE),                   //Luxon npm package with localeString DATETIME_SHORT
        startTime: "5:00PM",     
        endTime: "7:00PM",
        hostName: "Music4Fun",
        location: "Convention Center, Raleigh, NC",
        image: "https://imageio.forbes.com/specials-images/imageserve/5d094dfa4c687b00085a0001/A-bright-music-festival-stage-with-a-large--energetic-crowd-/960x0.jpg?fit=bounds&format=jpg&width=960",
        featuredEvent: true
    },
    {
        id: "2",
        name: "Hollie Music Festival",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 6, 11).toLocaleString(DateTime.DATE_HUGE),                    //Luxon npm package with localeString DATETIME_SHORT
        startTime: "11:00AM",     
        endTime: "2:00PM",
        hostName: "HollieOrganization",
        location: "Soccer Fields, Raleigh, NC",
        image: "https://live.staticflickr.com/5596/14416090556_07db4a8334_b.jpg",
        featuredEvent: true
    },
    {
        id: "3",
        name: "Summer Music Fest",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 9, 13).toLocaleString(DateTime.DATE_HUGE),                    //Luxon npm package with localeString DATETIME_SHORT
        startTime: "4:00PM",     
        endTime: "7:00PM",
        hostName: "SummerMusicFun",
        location: "Soccer Fields, Raleigh, NC",
        image: "https://studybreaks.com/wp-content/uploads/2017/06/636242815115195376924973386_Musicfestival.jpg",
        featuredEvent: true
    },
    {
        id: "4",
        name: "K-Pop Winter 2022",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 1, 13).toLocaleString(DateTime.DATE_HUGE),                   //Luxon npm package with localeString DATETIME_SHORT
        startTime: "6:00PM",     
        endTime: "9:00PM",
        hostName: "KPopWinter!",
        location: "Convention Center, Raleigh, NC",
        image: "https://studybreaks.com/wp-content/uploads/2020/01/deserthearts-e1580006981156.jpg",
        featuredEvent: true
    },
    {
        id: "5",
        name: "Grundge Fest 2022",
        topic: "Metal",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 3, 13).toLocaleString(DateTime.DATE_HUGE),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: "4:00PM",     
        endTime: "7:00PM",
        hostName: "FunTimeGrundge1992",
        location: "Underground Shop, Raleigh, NC",
        image: "https://theculturetrip.com/wp-content/uploads/2019/04/screaming-trees-rexfeatures_499068go.jpg",
        featuredEvent: true
    },
    {
        id: "6",
        name: "Music Event 2021",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2021, 4, 13).toLocaleString(DateTime.DATE_HUGE),                    //Luxon npm package with localeString DATETIME_SHORT
        startTime: "7:00PM",     
        endTime: "8:00PM",
        hostName: "NightMusic2021",
        location: "Convention Center, Raleigh, NC",
        image: "https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2018/01/19104925/iStock-503526285.jpg",
        featuredEvent: true
    },
    {
        id: "7",
        name: "Pop Fest 2022",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 4, 13).toLocaleString(DateTime.DATE_HUGE),                    //Luxon npm package with localeString DATETIME_SHORT
        startTime: "8:00PM",     
        endTime: "11:00PM",
        hostName: "Love+Pop2022",
        location: "Convention Center, Raleigh, NC",
        image: "https://jooinn.com/images/music-event-3.jpg",
        featuredEvent: true
    },
    {
        id: "8",
        name: "Stop Making Sense Live!",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(1980, 4, 13).toLocaleString(DateTime.DATE_HUGE),                    //Luxon npm package with localeString DATETIME_SHORT
        startTime: "5:00PM",     
        endTime: "7:00PM",
        hostName: "TalkingHeads",
        location: "Convention Center, Raleigh, NC",
        image: "https://www.screenslate.com/sites/default/files/images/Featured-170817-StopMakingSense.jpg",
        featuredEvent: true
    },
    {
        id: "9",
        name: "The Doors live in Miami!",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(1970, 4, 13).toLocaleString(DateTime.DATE_HUGE),                   //Luxon npm package with localeString DATETIME_SHORT
        startTime: "6:00PM",     
        endTime: "7:00PM",
        hostName: "The Doors",
        location: "Downtown, Miami, FL",
        image: "https://i.ytimg.com/vi/N24Xjd7cYgk/maxresdefault.jpg",
        featuredEvent: true
    },
];

//Model Interface to retrieve data from the array

//Shared global variables that will be updated in various methods. Primarly index route and newEvent.
let uniqueArray;
let uniqueCategories;

//Retrieve all musicEvent objects
exports.returnAll = () => {
    return musicEvents;
};

//Return unique category Set (All current categories present in model)
exports.returnCategorySet = () => {
    //Array to hold all categories at the start
    let allCategories = [];

    //Push all categories into array (If they are featured)
    musicEvents.forEach(e => {
        if (e.featuredEvent === false) {
            allCategories.push(e.topic); 
        }
    });

    //Create a unique set of categories
    uniqueArray = [...new Set(allCategories)];
    uniqueCategories = new Set(uniqueArray);
    
    //Return that unique set to controller
    return uniqueCategories;
};

//Used to grab the category for a passed in event
exports.returnEventTopic = (event) => {
    return musicEvents.find(e => (e.topic === event.topic));
}

//Retrieve all featuredEvents
exports.returnIsFeatured = (featuredFlag) => {
    return musicEvents.filter(e => (e.featuredEvent === featuredFlag));
};

//Retrieve all events related to a topic
exports.returnEventByType = (eventType) => {
    return musicEvents.filter(e => (e.topic === eventType && e.featuredEvent === false));
};

//Return the musicEvent specified by id
exports.returnEventById = (eventId) => {    //Return the musicEvents array first instance of the object with the specified ID
    return musicEvents.find(e => (e.id === eventId));
};

//Add a music Event to the array of musicEvents. This new music event is provided by the user via a POST form on the /events/new page where the user fills out a form to POST to the server
exports.addMusicEvent = (musicEvent) => {
    musicEvent.id = uuidv4();
    musicEvent.featuredEvent = false;     //Just set the featuredEvent option to False for anything new
    musicEvents.push(musicEvent);         //Push the new event onto the event array 
    
};

//Update current information for a musicEvent within the model submitted by the user in the PUT request specified by an events ID
exports.updateEventById = (eventId, updatedEvent) => {
    let oldEvent = musicEvents.find(e => (e.id === eventId));   //Locate the old event in the array, place into variable

    if (oldEvent) {     //If the oldEvent was found within the array, then update every updatable field within the object with the passed in object
        oldEvent.name = updatedEvent.name;
        oldEvent.topic = updatedEvent.topic;
        oldEvent.details = updatedEvent.details;
        oldEvent.date = updatedEvent.date;
        oldEvent.startTime = updatedEvent.startTime;
        oldEvent.endTime = updatedEvent.endTime;
        oldEvent.hostName = updatedEvent.hostName;
        oldEvent.location = updatedEvent.location;
        oldEvent.image = updatedEvent.image;
        return true;                                    //Updated object sucessfully, return true back to controller
    } else {
        return false;                                   //Otherwise, object was not found. Return false back to controller.
    }
};

//Delete a specific music event object within the array specified by a given Id
exports.deleteById = (eventId) => {
    let eventIndex = musicEvents.findIndex(e => (e.id === eventId));   //Locate index of specified event in array

    //If the eventIndex isnt -1, then the event exists in the array, and we must delete it
    if (eventIndex !== -1) {
        musicEvents.splice(eventIndex, 1);          //Splice 1 object out of the array from the found index
        return true;                                //Return true, we have spliced out the object from the array
    } else {                          //eventIndex returned as -1...
        return false;                 //Return false, as eventIndex was not found, unable to delete non existant event.
    }
};