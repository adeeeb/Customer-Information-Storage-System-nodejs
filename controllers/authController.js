const AuthUser = require("../models/authUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const signOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

const homePage = (req, res) => {
  res.render("welcome");
};

const logInPage = (req, res) => {
  res.render("auth/login");
};

const signUpPage = (req, res) => {
  res.render("auth/signup");
};
const signInFunction = async (req, res) => {
  try {
    //check validation (email and password)
    const objError = validationResult(req);
    //Arrey = objError.error
    if (objError.errors.length > 0) {
      return res.json({
        arrValidationError: objError.errors,
      });
    }
    //if email is found in Database
    const isCurrentEmail = await AuthUser.findOne({ email: req.body.email });
    if (isCurrentEmail) {
      return res.json({ existEmail: "Email already exist" });
    }
    //if there not found any errors create user and Storeg JWT in Cookies
    const newUser = await AuthUser.create(req.body);
    var token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY_JWT);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
    res.json({ id: newUser._id });
  } catch (err) {
    console.log(err);
  }
};

const logInFunction = async (req, res) => {
  try {
    const objError = validationResult(req);
    if (objError.errors.length > 0) {
      return res.json({
        arrValidationError: objError.errors,
      });
    }
    const logInUser = await AuthUser.findOne({ email: req.body.email });
    if (logInUser == null) {
      return res.json({ existEmail: "Email Not Found" });
    } else {
      const match = await bcrypt.compare(req.body.password, logInUser.password);

      if (match) {
        //Email and password is correct
        console.log("mail and Password is Correct");
        var token = jwt.sign({ id: logInUser._id }, process.env.SECRET_KEY_JWT);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        return res.json({ id: logInUser._id });
      } else {
        console.log("wrong Password");
        return res.json({
          wrongPass: `incorrect password for ${req.body.email}`,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signOut,
  homePage,
  logInPage,
  signUpPage,
  signInFunction,
  logInFunction,
};
