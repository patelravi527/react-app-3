const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
	"/createuser",
	[
		body("email", "Enter a valid Email").isEmail(),
		body("name", "Enter a valid Name").isLength({ min: 3 }),
		body("password", "Enter a valid Password").isLength({ min: 5 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res
					.status(400)
					.json({ error: "Sorry this email is all Ready exists" });
			}
			user = await User.create({
				email: req.body.email,
				name: req.body.name,
				password: req.body.password,
			});

			// .then(user => res.json(user))
			// .catch(err=>{console.log(err)
			//   res.json({
			//     error: 'Please enter a unique value for email',
			//     message: err.message
			//   })
			// })
			res.json(user);
		} catch (error) {
			console.log(error.message);
			res.status(500).send("SOme Error occured");
		}
	}
);

module.exports = router;
