const express = require('express')

const { Task, taskValidationSchema } = require('../models/task')
const validate = require('../middleware/validate')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const {
	getAll,
	getById,
	create,
	update,
	remove,
} = require('../controllers/tasks')

const objectIdFromParam = require('../middleware/objetIdFromParam')

const router = express.Router()

const taskList = {}

router.get('/', getAll)

router.get('/:taskId', objectIdFromParam('taskId'), validate, getById)

router.post('/', [auth], taskValidationSchema, validate, create)

router.put(
	'/:taskId',
	[auth, admin],
	objectIdFromParam('taskId'),
	taskValidationSchema,
	validate,
	update
)

router.delete(
	'/:taskId',
	[auth, admin],
	objectIdFromParam('taskId'),
	validate,
	remove
)

module.exports = router
