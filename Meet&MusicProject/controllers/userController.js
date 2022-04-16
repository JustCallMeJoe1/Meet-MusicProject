/*

    Author: Joe Strickland
    Controller Module for user related routes
    Performs the operation specified by the route regarding user related actions
    Date: April 16th, 2022

*/

exports.getRegister = (req, res, next) => {
    return res.render("register");
}

exports.createUser = (req, res, next) => {
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