const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Product Name is required"]
    },
    description: {
        type: String,
        require: [true, "Descripton is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    stock: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Product", productSchema);