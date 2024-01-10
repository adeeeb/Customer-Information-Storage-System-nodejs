const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareJwt = require("../middleware/middleware");
router.get("", middlewareJwt.requireAuth, userController.addUserRoute);
router.post("", userController.addUserDataToDb);

module.exports = router;
