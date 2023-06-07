const ClientError = require('../../exceptions/ClientError')

class ChallengeManagersHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator
	}

	async postManagedChallengeHandler(request, h){
		try {
			this._validator.validateChallengeManagerPayload(request.payload)
			const challenge_id = await this._service.addManagedChallenge(request.payload)

			const response = h.response({
				status: 'success',
				message: 'Challenge is added successfully',
				data: {
					challenge_id
				}
			})
			response.code(201)
			return response
		}
		catch (error) {
			if (error instanceof ClientError) {
				if (error instanceof ClientError) {
					const response = h.response({
						status: 'failed',
						message: error.message
					})
					response.code(error.statusCode)
					return response
				}
				const response = h.response({
					status: 'error',
					message: 'Sorry for the inconvenience, our server is having an error.'
				})
				response.code(500)
				return response
			}
		}
	}

	async getManagedChallengesHandler(request) {
		const {type} = request.query
		if (!type) {
			const challenges = await this._service.getManagedChallenges()
			return {
				status: 'success',
				data: {
					challenges
				}
			}
		}
		else {
			const challenges = await this._service.getManagedChallengesByType(type)
			return {
				status: 'success',
				data: {
					challenges
				}
			}
		}
	}

	async getManagedChallengeByIdHandler(request, h) {
		try {
			const {id} = request.params
			const challenge = await this._service.getManagedChallengeById(id)
			return {
				status: 'success',
				data: {
					challenge
				}
			}
		}
		catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'failed',
					message: error.message
				})
				response.code(error.statusCode)
				return response
			}
			const response = h.response({
				status: 'error',
				// message: 'Sorry for the inconvenience, our server is having an error.'
				message: error.message
			})
			response.code(500)
			return response
		}
	}

	async editManagedChallengeByIdHandler(request, h) {
		try {
			this._validator.validateChallengeManagerPayload(request.payload)
			const {id} = request.params

			await this._service.editManagedChallengeById(id, request.payload)
			return {
				status: 'success',
				message: 'Challenge is successfully altered'
			}
		}
		catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'failed',
					message: error.message
				})
				response.code(error.statusCode)
				return response
			}
			const response = h.response({
				status: 'error',
				// message: 'Sorry for the inconvenience, our server is having an error.'
				message: error.message
			})
			response.code(500)
			return response
		}
	}

	async deleteManagedChallengeByIdHandler(request, h) {
		try {
			const {id} = request.params
			await this._service.deleteManagedChallengeById(id)
			return {
				status: 'success',
				message: 'Challenge is successfully removed'
			}
		}
		catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'failed',
					message: error.message
				})
				response.code(error.statusCode)
				return response
			}
			const response = h.response({
				status: 'error',
				// message: 'Sorry for the inconvenience, our server is having an error.'
				message: error.message
			})
			response.code(500)
			return response
		}
	}
}

module.exports = ChallengeManagersHandler
