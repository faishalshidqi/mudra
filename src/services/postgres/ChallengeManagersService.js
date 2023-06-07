const {Pool} = require('pg')
const NotFoundError = require('../../exceptions/NotFoundError')
const InvariantError = require('../../exceptions/InvariantError')
const {nanoid} = require('nanoid')

class ChallengeManagersService {
	constructor() {
		this._pool = new Pool()
	}

	async addManagedChallenge({title, description, course_id, answer, is_deleted, type}) {
		const id = nanoid(16)
		const created_at = new Date().toISOString()
		const updated_at = created_at

		const query = {
			text: 'insert into challenges (challenge_id, title, description, course_id, answer, is_deleted, created_at, updated_at, type) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning challenge_id',
			values: [id, title, description, course_id, answer, is_deleted, created_at, updated_at, type]
		}

		const result = await this._pool.query(query)
		if (!result.rows[0].challenge_id) {
			throw new InvariantError('Failed adding the challenge')
		}
		return result.rows[0].challenge_id
	}

	async getManagedChallenges() {
		const query = {
			text: 'select challenges.*, courses.title as course_title from challenges, courses where challenges.course_id = courses.course_id'
		}

		const result = await this._pool.query(query)
		return result.rows
	}

	async getManagedChallengeById(id) {
		const query = {
			text: 'select challenges.*, courses.title as course_title from challenges, courses where challenges.challenge_id = $1 AND challenges.course_id = courses.course_id',
			values: [id]
		}

		const result = await this._pool.query(query)
		return result.rows[0]
	}

	async editManagedChallengeById(id, {title, description, course_id, answer, is_deleted, type}) {
		const updated_at = new Date().toISOString()
		const query = {
			text: 'update challenges set title = $1, description = $2, course_id = $3, answer = $4, is_deleted = $5, type = $6, updated_at = $7 where challenge_id = $8 returning challenge_id',
			values: [title, description, course_id, answer, is_deleted, type, updated_at, id]
		}

		const result = await this._pool.query(query)
		if (!result.rows.length) {
			throw new NotFoundError('Cannot update a not found challenge')
		}
	}

	async deleteManagedChallengeById(id) {
		const query = {
			text: 'delete from challenges where challenge_id = $1 returning challenge_id',
			values: [id]
		}

		const result = await this._pool.query(query)
		if (!result.rows.length) {
			throw new NotFoundError('Cannot delete not found challenge')
		}
	}

	async getManagedChallengesByType(type) {
		const query = {
			text: 'select * from challenges where type = $1',
			values: [type]
		}
		const result = await this._pool.query(query)
		if (!result.rowCount) {
			throw new NotFoundError('Challenge not found')
		}
		return result.rows
	}
}

module.exports = ChallengeManagersService
