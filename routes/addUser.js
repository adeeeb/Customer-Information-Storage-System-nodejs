const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("", userController.addUserRoute);
router.post("", userController.addUserDataToDb);

module.exports = router;
