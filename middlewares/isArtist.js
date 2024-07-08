const User = require("../models/User.model")

async function isArtist(req, res, next) {
	try {
		const user = await User.findOne({ _id: req.userId, isArtist: true})
		console.log(user, req.userId)
		if (user) {
			req.isArtist = true
		}
		next()
	} catch (error) {
		console.log(error)
	}
}

module.exports = isArtist
