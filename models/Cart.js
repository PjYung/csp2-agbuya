const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: Object,
            requre: true
        },
        quantity: {
            type: Number,
            require: true
        },
    }],
    totalAmount: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    dateUpdated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Cart", cartSchema);