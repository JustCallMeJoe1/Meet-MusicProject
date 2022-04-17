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

    user.save().then((newUser) => {
        res.redirect("/user/login");
    }).catch(error => {

        //Error when validating the user. Send back to register page with flash error.
        if(error.name === "ValidationError") {
            return res.redirect("back");
        }

        //Error caused by non-unique email address being submitted. Send back to register page with flash error.
        if(error.code === 11000) {
            return res.redirect("back");
        }

        //Internal error when saving to the database
        next(error);
    });
}

//Grab the login page view and return it to the user
exports.getLogin = (req, res, next) => {
    return res.render("login");
}

//Authenticate the user based on the provided email and password they give. Check against the database model.
exports.checkLogin = (req, res, next) => {
    
    //Retreive POST request information
    let submittedEmail = req.body.email;
    let submittedPassword = req.body.password;
    
    //Grab the user based on the submitted email
    User.findOne({email: submittedEmail}).then((user) => {

        //If a user is found...
        if(user) {
            user.comparePasswords(submittedPassword).then((result)=> {
                if(result) { //If the result of the compare is true then log the user into the website (Session established)
                    req.session.user = user._id;
                    res.redirect("/");
                } else { //Result is false, redirect back to login with flash error
                    console.log("Wrong Password");
                    res.redirect("/user/login");
                }
            }).catch(error => { //Error comparing the passwords, default handler
                next(error);
            })
        } else { //User is not found in the database
            console.log("Wrong email");
            res.redirect("/user/login");
        }
    }).catch((error) =>{ //Error querying the database for the user. Internal error.
        next(error);
    });
    
}

exports.logout = (req, res, next) => {
    return res.redirect("/");
}

exports.getProfile = (req, res, next) => {
    
    //Retrieve the user that has logged in and get their information
    let userId = req.session.user;

    //Find the user in the database and retrieve their info to pass to the profile page
    User.findById(userId).then((user) => {
        return res.render("profile", {user});
    }).catch((error) => {
        next(error);
    });

};