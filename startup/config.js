const config = require('config')

module.exports = () => {
	if (!config.has('jwtSecret')) {
		console.error(
			'environment variable `jwtPrivateKey` is not defined'
		)

		process.exit(1)
	}
}
