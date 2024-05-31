const { Task } = require('../models/task')

const getAll = async (req, res) => {
	const tasks = await Task.find()

	res.json(tasks)
}

const getById = async (req, res) => {
	const { taskId } = req.params

	const task = await Task.findById(taskId)

	if (!task)
		return res.status(404).json({ message: 'Item not found' })

	res.json(task)
}

const create = async (req, res) => {
	const newTask = await Task.create(req.body)

	res.status(201).json(newTask)
}

const update = async (req, res) => {
	const { taskId } = req.params

	const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
		new: true,
	})

	if (!updatedTask)
		return res.status(404).json({ message: 'Item not found' })

	res.json(updatedTask)
}

const remove = async (req, res) => {
	const { taskId } = req.params

	const deletedTask = await Task.findByIdAndDelete(taskId)

	if (!deletedTask)
		return res.status(404).json({ message: 'Item not found' })

	res.json(deletedTask)
}

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
}
