const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const { Error } = require("mongoose");

module.exports.addToCart = async (req, res) => {
    try {
        let addProduct = req.body.productId;

        const product = await Product.findById(addProduct);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        const cartItem = new Cart({products: product});
        await cartItem.save();

        return res.send({message: `Added ${product.name} to cart`});
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return res.status(500).send("Internal Server Error");
    }
};