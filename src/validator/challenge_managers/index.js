const {ChallengeManagerPayloadSchema} = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')
const ChallengeManagersValidator = {
	validateChallengeManagerPayload: (payload) => {
		const validationResult = ChallengeManagerPayloadSchema.validate(payload)
		if (validationResult.error) {
			throw new InvariantError(validationResult.error.message)
		}
	}
}

module.exports = ChallengeManagersValidator
