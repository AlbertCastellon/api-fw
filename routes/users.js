const express = require('express')
const bcrypt = require('bcrypt')

const { User, userValidationSchema } = require('../models/user')
const validate = require('../middleware/validate')

const auth = require('../middleware/auth')

const router = express.Router()

router.post(
	'/login',
	userValidationSchema,
	validate,
	async (req, res) => {
		const { username, password: passwordPlainText } = req.body

		const user = await User.findOne({ username })

		if (!user)
			return res.status(400).send('Usuario o contraseña invalido')

		const isAuth = await bcrypt.compare(
			passwordPlainText,
			user.password
		)

		if (!isAuth)
			return res.status(400).send('Usuario o contraseña invalido')

		const token = user.generateJWT()

		res.setHeader('x-auth-token', token)
		res.send('BRAVOOO')
	}
)

router.post(
	'/register',
	userValidationSchema,
	validate,
	async (req, res) => {
		const { username, password: passwordPlainText } = req.body

		const user = await User.findOne({ username })

		if (user)
			return res.status(400).send('Usuario o contraseña invalido')

		const salt = await bcrypt.genSalt(10)
		const password = await bcrypt.hash(passwordPlainText, salt)

		const newUser = await User.create({ username, password })

		const token = newUser.generateJWT()

		res.setHeader('x-auth-token', token)

		// Expide un token

		res.send('gracias por registrarte')
	}
)

router.get('/profile', auth, (req, res) => {
	console.log(req.user)

	res.send('BRAVOOO')
})

module.exports = router
