const mongoose = require('mongoose')
const { body } = require('express-validator')

const taskSchema = new mongoose.Schema({
	title: { type: String, required: true },
})

const Task = mongoose.model('Task', taskSchema)

const taskValidationSchema = [
	body('title')
		.notEmpty()
		.withMessage('title is required')
		.isString()
		.withMessage('title is not a string'),
]

module.exports = {
	Task,
	taskValidationSchema,
}
