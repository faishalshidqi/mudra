class ChallengesHandler {
	constructor(service) {
		this._service = service
	}

	async getChallengesHandler() {
		const challenges = await this._service.getChallenges()

		return {
			status: 'success',
			data: {
				challenges
			}
		}
	}

	async getChallengeByIdHandler(request, h) {
		const { id } = request.params

		const challange = await this._service.getChallengeById(id)

		const response = h.response({
			status: 'success',
			data: {
				challange
			}
		})
		response.code(200)

		return response
	}
}

module.exports = ChallengesHandler