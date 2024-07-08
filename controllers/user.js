//[SECTION] Dependencies and modules
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const { Error } = require("mongoose");
const Product = require("../models/Product")

//[SECTION] Controllers
module.exports.registerUser = async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        // Save the new user
        await newUser.save();

        res.json({ success: true});
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getAllUser = (req, res) => {
    return User.find({}).then(result => {
        return res.send(result)
    })
};

module.exports.loginUser = (req, res) => {

    return User.findOne({ email: req.body.email }).then(result => {

        //Check if user does not exist
        if (result == null) {
            return res.send(false); 

        //If user exists 
        } else {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)

            //Check if the passwords are the same
            if(isPasswordCorrect) {

                return res.send({ access: auth.createAccessToken(result)})

            } else {
                
                return res.send(false);
            }
        }
    });
};

module.exports.modifyUser = async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Check if the user is already an admin
      if (user.isAdmin) {
        return res.status(400).json({ message: 'User is already an admin' });
      }
      // Modify user type to true
      user.isAdmin = true;
      await user.save();
      res.status(200).json({ message: 'User type modified to true successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.getUserDetails = (req, res) => {
    return User.findById(req.params.userId).then(result => {
        result.password = "";

        return res.send(result)
    })
    .catch(error => res.send(error));
}