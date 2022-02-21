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

const musicEvents = [
    {
        //Start of Preloaded events (Music Events) objects
        id: "1",
        name: "Ozzy Ozbourne Tour Revamp",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2019, 4, 12).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2019, 4, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2019, 4, 12, 20, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "Ozzy Ozbourne",
        location: "Arena, United Kingdom, London",
        image: "https://cdn.smehost.net/ozzycom-uslegacyprod/wp-content/uploads/2019/05/Ozzy_NoMoreTours2_1200px2.jpg"
    },
    {
        id: "2",
        name: "David Bowie Tour Revamp - NC",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2020, 6, 12).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2020, 6, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2019, 4, 12, 20, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "David Bowie",
        location: "PNC Arena, Charlotte, NC",
        image: "https://i.ytimg.com/vi/JFHC6t13hi0/maxresdefault.jpg"
    },
    {
        id: "3",
        name: "Local Rock Fest 2022",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 8, 11).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2022, 8, 11, 17, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2022, 8, 11, 20, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "RockCharlotte",
        location: "Backyard, Cary, NC",
        image: "https://i.guim.co.uk/img/media/ad98f2dc808f18131e35e59c05ba6212671e8227/94_0_3061_1838/master/3061.jpg?width=620&quality=85&auto=format&fit=max&s=b72df2817ace7d67acf0a1ff9c218a03"
    },
    {
        id: "4",
        name: "Pop Convention 2022",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2023, 8, 11).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2023, 8, 11, 17, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2023, 8, 11, 20, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "PopNC",
        location: "Convention Center, Raleigh, NC",
        image: "https://res.cloudinary.com/jerrick/image/upload/f_jpg,fl_progressive,q_auto,w_1024/nl40rblansd92a0diypp.jpg"
    },
    {
        id: "5",
        name: "Generic Music 2012",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2012, 8, 11).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2012, 8, 11, 14, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2012, 8, 11, 16, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "2012Classics",
        location: "Convention Center, Raleigh, NC",
        image: "https://prism.fm/wp-content/uploads/2020/09/crowd-live-music.jpg"
    },
    {
        id: "6",
        name: "Pop Festival - Denver",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2015, 8, 11).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2015, 8, 11, 12, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2015, 8, 11, 13, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "DenverMusic",
        location: "Denver Arena, NC",
        image: "https://www.gannett-cdn.com/presto/2021/09/19/PMJS/1e1c662a-6f36-4807-9ce4-98aba395bd42-Photo_Sep_18_9_57_38_AM.jpg?crop=6719,3780,x0,y672&width=3200&height=1801&format=pjpg&auto=webp"
    },
    {
        id: "7",
        name: "MetalFest: Charlotte 2022",
        topic: "Metal",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 12, 11).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2022, 12, 11, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2022, 12, 11, 21, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "MetalFest",
        location: "PNC Arena, Charlotte, NC",
        image: "https://www.mastersofrock.cz/catalog/view/theme/metalfest/assets/img/slide01.jpg"
    },
    {
        id: "8",
        name: "Metal Concert - Charlotte",
        topic: "Metal",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2018, 12, 11).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2018, 12, 11, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2018, 12, 11, 21, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "UndergroundMetal",
        location: "PNC Arena, Charlotte, NC",
        image: "https://chasingthelightart.s3.eu-central-1.amazonaws.com/wp-content/uploads/20191018125006/Walkways-2019-08-31-23-10-11-5706-4-696x464.jpg"
    },
    {
        id: "9",
        name: "RTP Metal - NC",
        topic: "Metal",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2019, 12, 11).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2019, 12, 11, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2019, 12, 11, 21, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "RTPMetalScene",
        location: "Convention Center, Raleigh, NC",
        image: "https://www.theclandestined.com/wp-content/uploads/2020/11/XBSFfT-563x353.jpg"
    },
    //Start of Featured Events (Index Page) objects
    {
        id: "10",
        name: "Music Festival",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2019, 12, 11).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2019, 12, 11, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2019, 12, 11, 21, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "Music4Fun",
        location: "Convention Center, Raleigh, NC",
        image: "https://imageio.forbes.com/specials-images/imageserve/5d094dfa4c687b00085a0001/A-bright-music-festival-stage-with-a-large--energetic-crowd-/960x0.jpg?fit=bounds&format=jpg&width=960"
    },
    {
        id: "11",
        name: "Hollie Music Festival",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 6, 11).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2022, 6, 11, 12, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2022, 6, 11, 14, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "HollieOrganization",
        location: "Soccer Fields, Raleigh, NC",
        image: "https://live.staticflickr.com/5596/14416090556_07db4a8334_b.jpg"
    },
    {
        id: "12",
        name: "Summer Music Fest",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 9, 13).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2022, 9, 13, 12, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2022, 9, 13, 14, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "SummerMusicFun",
        location: "Soccer Fields, Raleigh, NC",
        image: "https://studybreaks.com/wp-content/uploads/2017/06/636242815115195376924973386_Musicfestival.jpg"
    },
    {
        id: "13",
        name: "K-Pop Winter 2022",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 1, 13).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2022, 1, 13, 12, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2022, 1, 13, 14, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "KPopWinter!",
        location: "Convention Center, Raleigh, NC",
        image: "https://studybreaks.com/wp-content/uploads/2020/01/deserthearts-e1580006981156.jpg"
    },
    {
        id: "14",
        name: "Grundge Fest 2022",
        topic: "Metal",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 3, 13).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2022, 3, 13, 14, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2022, 3, 13, 17, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "FunTimeGrundge1992",
        location: "Underground Shop, Raleigh, NC",
        image: "https://theculturetrip.com/wp-content/uploads/2019/04/screaming-trees-rexfeatures_499068go.jpg"
    },
    {
        id: "15",
        name: "Music Event 2021",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2021, 4, 13).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2021, 4, 13, 14, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2021, 4, 13, 17, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "NightMusic2021",
        location: "Convention Center, Raleigh, NC",
        image: "https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2018/01/19104925/iStock-503526285.jpg"
    },
    {
        id: "16",
        name: "Pop Fest 2022",
        topic: "Pop",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(2022, 4, 13).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(2022, 4, 13, 14, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(2022, 4, 13, 17, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "Love+Pop2022",
        location: "Convention Center, Raleigh, NC",
        image: "https://jooinn.com/images/music-event-3.jpg"
    },
    {
        id: "17",
        name: "Stop Making Sense Live!",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(1980, 4, 13).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(1980, 4, 13, 14, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(1980, 4, 13, 17, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "TalkingHeads",
        location: "Convention Center, Raleigh, NC",
        image: "https://www.screenslate.com/sites/default/files/images/Featured-170817-StopMakingSense.jpg"
    },
    {
        id: "18",
        name: "The Doors live in Miami!",
        topic: "Rock",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: DateTime.local(1970, 4, 13).toLocaleString(DateTime.DATETIME_SHORT),                  //Luxon npm package with localeString DATETIME_SHORT
        startTime: DateTime.local(1970, 4, 13, 17, 0).toLocaleString(DateTime.DATETIME_SHORT),      //Luxon npm package with localeString DATETIME_SHORT
        endTime: DateTime.local(1980, 4, 13, 23, 0).toLocaleString(DateTime.DATETIME_SHORT),        //Luxon npm package with localeString DATETIME_SHORT
        hostName: "The Doors",
        location: "Downtown, Miami, FL",
        image: "https://i.ytimg.com/vi/N24Xjd7cYgk/maxresdefault.jpg"
    },
];

//Model Interface to retrieve data from the array
