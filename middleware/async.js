module.exports = function asyncErrors(routeHandler) {
	return async (req, res, next) => {
		try {
			await routeHandler(req, res)
		} catch (err) {
			next(err)
		}
	}
}
