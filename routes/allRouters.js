const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AuthController = require("../controllers/authController");
const middlewareJwt = require("../middleware/middleware");
const { check } = require("express-validator");

//Auth Routes

router.get("*", middlewareJwt.checkIfUser);

router.get("/signout", AuthController.signOut);

router.get("/", AuthController.homePage);

router.get("/login", AuthController.logInPage);

router.get("/signup", AuthController.signUpPage);

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  AuthController.signInFunction
);

router.post(
  "/login",
  [check("email", "Please provide a valid email").isEmail()],
  AuthController.logInFunction
);

//Dashboard Routes

//Get REQUEST
router.get("/home", middlewareJwt.requireAuth, userController.getAllData);

//result ==> object
router.get(
  "/view/:id",
  middlewareJwt.requireAuth,
  userController.viewSpecificData
);

router.get(
  "/edit/:id",
  middlewareJwt.requireAuth,
  userController.editSpecificData
);

//POST REQUEST

router.post("/search", userController.searchData);

//DELETE REQUIST
router.delete(
  "/edit/:id",
  middlewareJwt.requireAuth,
  userController.deleteSpecificData
);

//PUT REQUEST
router.put(
  "/edit/:id",
  middlewareJwt.requireAuth,
  userController.updateSpecificData
);

module.exports = router;
