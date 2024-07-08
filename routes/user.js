//[SECTION] Dependencies and modules
const express = require("express");
const userController = require("../controllers/user");
const auth = require("../auth");

//[SECTION] Routing Component
const router = express.Router();

//Destruction the verify and verifyAdmin from auth
const { verify, verifyAdmin } = auth;

//[SECTION] ROUTES

//User Registration
router.post("/register", userController.registerUser);

//Get All User
router.get("/", verify, verifyAdmin, userController.getAllUser);

//Login
router.post("/login", userController.loginUser);

//Change user type to Admin
router.put("/:userId/setAdmin", verify, verifyAdmin, userController.modifyUser)

router.get("/:userId/user-details", verify, userController.getUserDetails)
module.exports = router;