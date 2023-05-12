const { Pool } = require('pg')
const NotFoundError = require('../../exceptions/NotFoundError')
const { mapDBToModelChallenges } = require('../../utils/mapDBToModel')

class ChallengesService {
	constructor() {
		this._pool = new Pool()
	}

	async getChallenges() {
		const query = 'SELECT * FROM challenges WHERE is_delete = false'

		const result = await this._pool.query(query)

		if (!result.rowCount) {
			throw new NotFoundError('Challenges tidak ditemukan')
		}
    
		return result.rows.map(mapDBToModelChallenges)
	}

	async getChallengeById(id) {
		const query = {
			text: 'SELECT * FROM challenges WHERE id=$1',
			values: [id]
		}

		const result = await this._pool.query(query)

		if (!result.rowCount) {
			throw new NotFoundError('Challenge tidak ditemukan')
		}

		return result.rows.map(mapDBToModelChallenges)[0]
	}
}

module.exports = ChallengesService