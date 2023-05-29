const Joi = require('joi')

const ChallengeManagerPayloadSchema = Joi.object({
	// {title, description, course_id, answer, is_deleted, type}
	title: Joi.string().required(),
	description: Joi.string().required(),
	course_id: Joi.string().required(),
	answer: Joi.string().required(),
	is_deleted: Joi.boolean().required(),
	type: Joi.string().required()
})

module.exports = {ChallengeManagerPayloadSchema}
