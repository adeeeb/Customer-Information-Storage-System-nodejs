const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Get REQUEST
router.get("/", userController.getAllData);

//result ==> object
router.get("/view/:id", userController.viewSpecificData);

router.get("/edit/:id", userController.editSpecificData);

//POST REQUEST

router.post("/search", userController.searchData);

//DELETE REQUIST
router.delete("/edit/:id", userController.deleteSpecificData);

//PUT REQUEST
router.put("/edit/:id", userController.updateSpecificData);

module.exports = router;
