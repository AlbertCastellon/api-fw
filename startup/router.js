require('express-async-errors')
const express = require('express')

// const logger = require('../middleware/logger.js')

const morgan = require('morgan')

module.exports = function (app) {
	app.use(express.json())

	app.use(morgan('dev'))

	app.use('/api/tasks', require('../routes/tasks.js'))
	app.use('/api', require('../routes/users.js'))

	app.get('/ping', (req, res) => {
		res.json({ message: 'pong' })
	})

	app.use(require('../middleware/errors'))
}
