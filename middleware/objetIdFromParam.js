const { body, param, validationResult } = require('express-validator')

module.exports = function objectIdFromParam(field) {
	return param('taskId').isMongoId().withMessage('invalid format id')
}
