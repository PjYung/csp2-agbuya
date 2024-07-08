const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const { Error } = require("mongoose");

module.exports.createOrder = async (req, res) => {
  try {
    // Extract data from the request body
    const { userId, products } = req.body;

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate total order amount and validate products
    let totalAmount = 0;
    const orderProducts = [];

    for (const { productId, quantity } of products) {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (quantity > product.stock) {
        return res.status(400).json({ error: "Insufficient stock for the product" });
      }

      totalAmount += product.price * quantity;
      orderProducts.push({ productId, quantity });
    }

    // Create the order
    const order = new Order({
      userId: userId,
      products: orderProducts,
      totalAmount: totalAmount
    });

    // Save the order
    await order.save();

    //Loop to Update product stock
    for (const { productId, quantity } of orderProducts) {
      const product = await Product.findById(productId);
      product.stock -= quantity;
      await product.save();
    }

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllOrder = (req, res) => {
  return Order.find({})
  .then(result => {
    return res.send(result)
  })
  .catch(error => {
    console.error("Error fetching order:", error);
    return res.status(500).send("Internal Server Error");
  });
}

module.exports.getOrder = (req, res) => {
  return Order.findById(req.params.orderId)
    .then(result => {
      if (!result) {
        return res.status(404).send("Order not found");
      }
      return res.send(result);
    })
    .catch(error => {
      console.error("Error fetching order:", error);
      return res.status(500).send("Internal Server Error");
    });
};

module.exports.updateOrder = (req, res) => {
  let newStatus = {status: req.body.status}

  return Order.findByIdAndUpdate(req.params.orderId, newStatus)
  .then(result => {
    if (!result) {
        return res.status(404).send("Order not found");
      }
      return res.send({message: `Status updated`});
    })
    .catch(error => {
      console.error("Error fetching order:", error);
      return res.status(500).send("Internal Server Error");
    });
};

