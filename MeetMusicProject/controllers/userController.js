/*

    Author: Joe Strickland
    Controller Module for user related routes
    Performs the operation specified by the route regarding user related actions
    Date: April 16th, 2022

*/
//Grab needed models to manipulate data stored in database.
const User = require("../models/user");
const musicEvents = require("../models/musicEvent");
const rsvpModel = require("../models/rsvp");

//Grab the register page
exports.getRegister = (req, res, next) => {
    return res.render("register");
}

//Validate information from post request. Hash and salt user password after validation and save to database.
exports.createUser = (req, res, next) => {
    let user = new User(req.body);

    user.save().then((newUser) => {
        req.flash("success", "User account successfully registered!");
        res.redirect("/user/login");
    }).catch(error => {

        //Error when validating the user. Send back to register page with flash error.
        if(error.name === "ValidationError") {
            req.flash("error", error.message);
            return res.redirect("back");
        }

        //Error caused by non-unique email address being submitted. Send back to register page with flash error.
        if(error.code === 11000) {
            req.flash("error", "Email provided already exists!");
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
                    req.session.firstName = user.firstName;
                    req.session.lastName = user.lastName;
                    req.flash("success", "User has successfully logged in!");
                    res.redirect("/");
                } else { //Result is false, redirect back to login with flash error
                    req.flash("error", "Incorrect Password!");
                    res.redirect("/user/login");
                }
            }).catch(error => { //Error comparing the passwords, default handler
                next(error);
            })
        } else { //User is not found in the database
            req.flash("error", "User not found. Please register first!");
            res.redirect("/user/login");
        }
    }).catch((error) =>{ //Error querying the database for the user. Internal error.
        next(error);
    });
    
}

//Log the user out of the session. Destroy the current active session.
exports.logout = (req, res, next) => {
    
    //Destroy the current session, if no error redirect back to homepage. Otherwise display error
    req.session.destroy((error) => {
        if(error) {
            next(error);
        } else {
            res.redirect("/");
        }
    });
};

//Retrieve the respective user's profile. Render the view and pass the user's session data to display in a table.
exports.getProfile = (req, res, next) => {
    
    //Retrieve the user that has logged in and get their information
    let userId = req.session.user;

    //Find the user in the database and retrieve their info to pass to the profile page
    //Find the stories created by the user and retrieve it's respective information. Use PromiseAll to perform both queries
    Promise.all([User.findById(userId), musicEvents.find({ hostName: userId }), rsvpModel.find({ userRSVP: userId }).populate("eventRSVP", "id name topic")]).then(profileInformation => {
        
        //Filter out information from the profileInformation return (Array)
        const [ userInfo, eventInfo, rsvpInfo ] = profileInformation;
        
        return res.render("profile", { userInfo, eventInfo, rsvpInfo });
    }).catch((error) => {
        next(error);
    });

};