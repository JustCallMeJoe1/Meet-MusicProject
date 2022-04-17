/*

    Author: Joe Strickland
    Controller Module for user related routes
    Performs the operation specified by the route regarding user related actions
    Date: April 16th, 2022

*/
//Grab needed models to manipulate data stored in database.
const User = require("../models/user");

//Grab the register page
exports.getRegister = (req, res, next) => {
    return res.render("register");
}

//Validate information from post request. Hash and salt user password after validation and save to database.
exports.createUser = (req, res, next) => {
    let user = new User(req.body);

    user.save().then((result) => {
        
    })
    return res.redirect("/");
}

exports.getLogin = (req, res, next) => {
    return res.render("login");
}

exports.checkLogin = (req, res, next) => {
    return res.redirect("/");
}

exports.logout = (req, res, next) => {
    return res.redirect("/");
}

exports.getProfile = (req, res, next) => {
    return res.render("profile");
}