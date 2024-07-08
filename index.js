//Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");

//Cross origin resource sharing
//Allows our backend application to be available to our frontend application
const cors = require("cors");

//External Route
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order")
const cartRoutes = require("./routes/cart")

//Environment setup

const port = 4000;

//Server setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Allows our backend application to be available to our frontend application
app.use(cors());

//Database Connection
mongoose.connect("mongodb+srv://pjagbuyadev:admin123@cluster0.3u4tn0o.mongodb.net/ecommerce_system?retryWrites=true&w=majority")
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas"))

//[SECTION]Backend Routes
app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
app.use("/cart", cartRoutes)

//Server Gateway Response
if(require.main === module) {
    app.listen(port, () => {
        console.log(`API is now online on port ${port}`);
    })
}

module.exports = {app, mongoose};