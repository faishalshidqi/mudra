const Joi = require('joi')

const ChallengeManagerPayloadSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	course_id: Joi.string().required(),
	answer: Joi.string().required(),
	is_deleted: Joi.boolean().required(),
	type: Joi.string().required()
})

module.exports = {ChallengeManagerPayloadSchema}
