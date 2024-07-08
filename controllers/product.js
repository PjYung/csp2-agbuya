const Product = require("../models/Product");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const { Error } = require("mongoose");

module.exports.addProduct = (req, res) => {
    let newProduct = new Product ({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    return newProduct.save()
    .then((product, error) => {
        if(error) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
    .catch(err => res.send(err))
};

module.exports.getAllProduct = (req, res) => {
    return Product.find({})
    .then(result => {
        return res.send(result)
    }) 
    .catch(error => {
        // Handle other errors, such as database errors
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    })
};

module.exports.getAllActive = (req, res) => {
    return Product.find({isActive: true})
    .then(result => {
        return res.send(result)
    })
    .catch(error => {
        // Handle other errors, such as database errors
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    })
};

module.exports.getProduct = (req, res) => {
    Product.findById(req.params.productId)
    .then(result => {
    if (!result) {
        // If no product is found, send a 404 Not Found response
        return res.status(404).json({ error: 'Product not found' });
    }

    // If the product is found, send it in the response
    return res.send(result);
    })
    .catch(error => {
    // Handle other errors, such as database errors
    console.error('Error fetching product:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
    })
};

module.exports.updateProduct = (req, res) => {
    let updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }

    return Product.findByIdAndUpdate(req.params.productId, updatedProduct)
    .then((result, error) => {
        if(error) {
            return res.send(false);
        } else {
            return res.send(true)
        }
    })
    .catch(error => {
        // Handle other errors, such as database errors
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    })
};

module.exports.archiveProduct = (req, res) => {
    // Check the current state of the product
    Product.findById(req.params.productId)
        .then(existingProduct => {
            // If the product is already inactive, send an error response
            if (!existingProduct.isActive) {
                return res.status(400).send({ error: 'Product is already inactive.' });
            }

            // If the product is active, update its state to inactive
            const archiveProduct = {
                isActive: false
            };

            return Product.findByIdAndUpdate(req.params.productId, archiveProduct)
                .then(result => {
                    return res.send(true);
                })
                .catch(error => {
                    return res.send(false);
                });
        })
        .catch(err => res.send(err));
};

module.exports.activateProduct = (req, res) => {
    // Check the current state of the product
    Product.findById(req.params.productId)
        .then(existingProduct => {
            // If the product is already inactive, send an error response
            if (existingProduct.isActive) {
                return res.status(400).send({ error: 'Product is already active.' });
            }

            // If the product is active, update its state to inactive
            const activateProduct = {
                isActive: true
            };

            return Product.findByIdAndUpdate(req.params.productId, activateProduct)
                .then(result => {
                    return res.send(true);
                })
                .catch(error => {
                    return res.send(false);
                });
        })
        .catch(err => res.send(err));
};

module.exports.updateStock = (req, res) => {
    let updateStock = {stock: req.body.stock}

    return Product.findByIdAndUpdate(req.params.productId, updateStock)
    .then(result => {
        if(!result.isActive) {
            return res.send({message: "Product is inActive"})
        } else {
            return res.send({message: "Product Updated"})
        }
    })
    .catch(err => res.send(err));
};

