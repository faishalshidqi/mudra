const { Pool } = require('pg')
const NotFoundError = require('../../exceptions/NotFoundError')
const { mapDBToModelChallenges} = require('../../utils/mapDBToModel')

class ChallengesService {
	constructor() {
		this._pool = new Pool()
	}

	async getChallenges() {
		const query = 'SELECT * FROM challenges WHERE is_deleted = false order by type, title'

		const result = await this._pool.query(query)

		if (!result.rowCount) {
			throw new NotFoundError('Challenges tidak ditemukan')
		}

		return result.rows.map(mapDBToModelChallenges)
	}

	async getChallengeById(id) {
		const query = {
			text: 'SELECT * FROM challenges WHERE challenge_id = $1 and is_deleted = false',
			values: [id]
		}

		const result = await this._pool.query(query)

		if (!result.rowCount) {
			throw new NotFoundError('Challenge tidak ditemukan')
		}

		return result.rows.map(mapDBToModelChallenges)[0]
	}

	async getChallengesByType(type) {
		const query = {
			text: 'select * from challenges where type = $1 and is_deleted = false order by title',
			values: [type]
		}
		const result  = await this._pool.query(query)
		if (!result.rowCount) {
			throw new NotFoundError('Challenge tidak ditemukan')
		}
		return result.rows.map(mapDBToModelChallenges)
	}
}

module.exports = ChallengesService
