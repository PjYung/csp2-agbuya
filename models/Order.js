const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: Object,
        require: true
    },
    products: [
        {
            productId: {
                type: Object,
                requre: true
            },
            quantity: {
                type: Number,
                require: true
            },
        }
    ],
    totalAmount: {
        type: Number
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered"],
        default: "Pending"
    },
    purchasedOn: {
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model("Order", orderSchema);