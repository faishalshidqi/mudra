class ChallengeManagersHandler {
	constructor(service, usersService, validator) {
		this._service = service
		this._usersService = usersService
		this._validator = validator
	}

	async postManagedChallengeHandler(request, h){
		const {id} = request.auth.credentials
		await this._usersService.verifyAdminRole(id)
		this._validator.validateChallengeManagerPayload(request.payload)
		const {challenge_id} = await this._service.addManagedChallenge(request.payload)

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

	async getManagedChallengesHandler(request) {
		const {id} = request.auth.credentials
		await this._usersService.verifyAdminRole(id)

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
		const challenges = await this._service.getManagedChallengesByType(type)
		return {
			status: 'success',
			data: {
				challenges
			}
		}

	}

	async getManagedChallengeByIdHandler(request) {
		const {id: user_id} = request.auth.credentials
		await this._usersService.verifyAdminRole(user_id)

		const {id} = request.params
		const challenge = await this._service.getManagedChallengeById(id)
		return {
			status: 'success',
			data: {
				challenge
			}
		}
	}

	async editManagedChallengeByIdHandler(request) {
		const {id: user_id} = request.auth.credentials
		await this._usersService.verifyAdminRole(user_id)

		this._validator.validateChallengeManagerPayload(request.payload)
		const {id} = request.params

		await this._service.editManagedChallengeById(id, request.payload)
		return {
			status: 'success',
			message: 'Challenge is successfully altered'
		}

	}

	async deleteManagedChallengeByIdHandler(request) {
		const {id: user_id} = request.auth.credentials
		await this._usersService.verifyAdminRole(user_id)

		const {id} = request.params
		await this._service.deleteManagedChallengeById(id)
		return {
			status: 'success',
			message: 'Challenge is successfully removed'
		}
	}
}

module.exports = ChallengeManagersHandler
