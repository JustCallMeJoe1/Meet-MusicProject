/*

    Author: Joe Strickland
    Controller Module for general site navigation
    Performs the operation specified by the route regarding site navigation
    Date: Feb 22th, 2022

*/

//GET / index page
exports.index = (req, res)=> {
    res.render("index");
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
exports.getFeaturedEvent = (req, res)=> {
    res.render("musicEvent");
};
