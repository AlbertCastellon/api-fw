module.exports = function (req, res, next) {
	console.log(req.method, req.path)

	console.log(req.body)

	next()
}
