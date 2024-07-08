//[SECTION] Dependencies and modules
const express = require("express");
const orderController = require("../controllers/order");
const auth = require("../auth");

//[SECTION] Routing Component
const router = express.Router();

//Destruction the verify and verifyAdmin from auth
const { verify, verifyAdmin } = auth;

// [SECTION] ROUTES
//Route to create order
router.post('/', verify, orderController.createOrder)

router.get('/all', verify, verifyAdmin, orderController.getAllOrder)

router.get('/:orderId', verify, orderController.getOrder)

router.post('/:orderId', verify, verifyAdmin, orderController.updateOrder)

module.exports = router;