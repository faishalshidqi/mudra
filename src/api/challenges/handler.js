class ChallengesHandler {
	constructor(service) {
		this._service = service
	}

	async getChallengesHandler(request) {
		const {type} = request.query
		if (!type) {
			const challenges = await this._service.getChallenges()
			return {
				status: 'success',
				data: {
					challenges
				}
			}
		}
		const challenges = await this._service.getChallengesByType(type)
		return {
			status: 'success',
			data: {
				challenges
			}
		}

	}

	async getChallengeByIdHandler(request, h) {
		const { id } = request.params

		const challenge = await this._service.getChallengeById(id)

		const response = {
			status: 'success',
			data: {
				challenge
			}
		}
		return response
	}
}

module.exports = ChallengesHandler
