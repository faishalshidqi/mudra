const Joi = require('joi')

const CourseManagerPayloadSchema = Joi.object({
	title: Joi.string().required(),
	sign_pict_link: Joi.string().required(),
	description: Joi.string().required(),
	type: Joi.string().required(),
	is_deleted: Joi.boolean().required()
})

module.exports = {CourseManagerPayloadSchema}
