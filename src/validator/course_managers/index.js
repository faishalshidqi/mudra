const {CourseManagerPayloadSchema} = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')
const CourseManagersValidator = {
	validateCourseManagerPayload: (payload) => {
		const validationResult = CourseManagerPayloadSchema.validate(payload)
		if (validationResult.error) {
			throw new InvariantError(validationResult.error.message)
		}
	}
}

module.exports = CourseManagersValidator
