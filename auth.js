// [SECTION] Dependencies and Modules
const jwt = require("jsonwebtoken");

// Used in the algorithm for encrypting our data which makes it difficult to decode.
const secret = "CourseBookingAPI";

// [SECTION] Token Creation
module.exports.createAccessToken = (user) => {

	// When the user logs in, a token will be created with user's information
	// Payload
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	// Generate a JSON web token using the sign() method
	// the data = payload, secret = used for encryption, {} = for options
	return jwt.sign(data, secret, {});
}


// [SECTION] Token Verification

module.exports.verify = (req, res, next) => {

	// This is provided in postman under
		// Authorization > Bearer Token
	console.log(req.headers.authorization);

	let token = req.headers.authorization;

	// Check if the token (JWT) exists
	if(typeof token === "undefined"){

		return res.send({ auth: "Failed. No Token" });

	} else {

		console.log(token);

		// This is the data that will be received from req.headers.authrization
			// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjBjMzYyNmNhYzJjM2VhYTBmY2I5YSIsImVtYWlsIjoic3BpZGVybWFuM0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjQzMjQ1MTEyfQ.c29qelk9GkrnZP10M6wqo6fiTKHPk-c15DcpSBsKq7I"

		token = token.slice(7, token.length);
		console.log(token); // OUTPUT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjBjMzYyNmNhYzJjM2VhYTBmY2I5YSIsImVtYWlsIjoic3BpZGVybWFuM0BnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjQzMjQ1MTEyfQ.c29qelk9GkrnZP10M6wqo6fiTKHPk-c15DcpSBsKq7I"

		jwt.verify(token, secret, function(err, decodedToken){

			if(err){
				return res.send({
					auth: "Failed",
					message: err.message
				})
			} else {

				console.log(decodedToken) //contains the data from our token
				/*
					decodedToken = {
						id: "",
						email: "",
						isAdmin: false
					}
				*/
				req.user = decodedToken;
				// user property will be added to request object (req) and will contain our payload (decodedToken)
				// It can be accessed in the next middleware/controller.

				// next() will let us proceed to the next middleware OR controller
				next();
			}
		});
	}
}

// [SECTION] verifyAdmin - Verify if the logged in user is an Admin
module.exports.verifyAdmin = (req, res, next) => {

	//verifyAdmin comes after the verify middleware,
	//Do we have any access to our user's isAdmin detail?
	//We can get details from req.user because verifyAdmin comes after verify method.
	//Note: You can only have req.user for any middleware or controller that comes after verify.

	if(req.user.isAdmin){

		next();

	} else {

		return res.send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
}