//[SECTION] Dependencies and modules
const express = require("express");
const cartController = require("../controllers/cart");
const auth = require("../auth");

//[SECTION] Routing Component
const router = express.Router();

//Destruction the verify and verifyAdmin from auth
const { verify, verifyAdmin } = auth;

router.post("/add", cartController.addToCart)

module.exports = router;