//[SECTION] Dependencies and modules
const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");

//[SECTION] Routing Component
const router = express.Router();

//Destruction the verify and verifyAdmin from auth
const { verify, verifyAdmin } = auth;

//[SECTION] ROUTES

//Route for creating a product
router.post("/create", verify, verifyAdmin, productController.addProduct);

//Route for getting all product
router.get("/all", productController.getAllProduct)

//Route for getting all all active product
router.get("/active", productController.getAllActive)

//Route for getting a specified product
router.get("/:productId", productController.getProduct)

//Route for updating a specified product
router.put("/:productId/update", verify, verifyAdmin, productController.updateProduct)

//Route for archiving specified product
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct)

// Route for activating a specified product
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct)

router.patch("/:productId/update-stock", verify, verifyAdmin, productController.updateStock)



module.exports = router;

