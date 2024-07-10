const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const router = require("express").Router()
const jwt = require("jsonwebtoken")
const isAuth = require("../middlewares/isAuthenticated")

const SALT = 12

router.post("/signup", async (req, res, next) => {
	try {
		const { username, email, password,firstname,lastname, isArtist } = req.body
		if (!username || !email || !password) {
			return res
				.status(400)
				.json({ message: "username, email and password are mandatory." })
		}
		const foundUser = await User.findOne({ email: email })
		if (foundUser) {
			return res
				.status(400)
				.json({ message: "This email is already used, try again." })
		}

		// // Use regex to validate the email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
		if (!emailRegex.test(email)) {
			res.status(400).json({ message: "Provide a valid email address." })
			return
		}

		// // Use regex to validate the password format
		const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
		if (!passwordRegex.test(password)) {
			res
				.status(400)
				.json({
					message:
						"Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
				})
			return
		}

		const hashedPassword = await bcrypt.hash(password, SALT)

		const createdUser = await User.create({
			username,
			email,
			password: hashedPassword,
			isArtist,
		})

		res.status(201).json({
			message: `Created user ${createdUser.username} with id ${createdUser._id}`,
		})
	} catch (error) {
		console.log(error)
	}
})


router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body
		if (!email || !password) {
			return res.status(400).json({ message: "Need some infos to work here!" })
		}

		const foundUser = await User.findOne({ email }, { email: 1, password: 1 })
		if (!foundUser) {
			return res.status(400).json({ message: "Wrong credentials" })
		}

		const correctPassword = await bcrypt.compare(password, foundUser.password)
		if (!correctPassword) {
			return res.status(400).json({ message: "Wrong credentials" })
		}
		// The user is who they say they are

		const payload = { id: foundUser._id }
		const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
			expiresIn: "1d",
			algorithm: "HS256",
		})

		res.json({ accessToken: token })
	} catch (error) {
		console.log(error)
	}
})

router.get("/verify", isAuth, async (req, res, next) => {
	try {
		const user = await User.findById(req.userId)
		res.json(user)
	} catch (error) {
		next(error)
	}
})

module.exports = router
