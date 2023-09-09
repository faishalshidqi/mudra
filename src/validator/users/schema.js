const Joi = require('joi')

const UsersPayloadSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	fullname: Joi.string().required(),
	authorized: Joi.boolean()
})

module.exports = { UsersPayloadSchema }
