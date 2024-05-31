const mongoose = require('mongoose')
const { body } = require('express-validator')
const jwt = require('jsonwebtoken')

const config = require('config')

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isAdmin: Boolean,
})

userSchema.methods.generateJWT = function () {
	return jwt.sign(
		{ username: this.username, isAdmin: this.isAdmin },
		config.get('jwtSecret')
	)
}

const User = mongoose.model('User', userSchema)

const userValidationSchema = [
	body('username')
		.notEmpty()
		.withMessage('username is required')
		.isString()
		.withMessage('username is not a string'),
	body('password')
		.notEmpty()
		.withMessage('password is required')
		.isString()
		.withMessage('password is not a string'),
]

module.exports = {
	User,
	userValidationSchema,
}
