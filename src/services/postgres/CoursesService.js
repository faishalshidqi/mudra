const {Pool} = require('pg')
const {nanoid} = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");

class CoursesService {
	constructor() {
		this._pool = new Pool()
	}

	async addCourse(title, sign_pict_link, description, type){
		const id = nanoid(16)
		const created_at = new Date().toISOString()
		const updated_at = created_at

		const query = {
			text: 'insert into courses (course_id, title, sign_pict_link, description, type, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7) returning course_id',
			values: [id, title, sign_pict_link, description, type, created_at, updated_at]
		}

		const result = await this._pool.query(query)
		if (!result.rows[0].course_id) {
			throw new InvariantError('Failed adding the course')
		}
		return result.rows[0].course_id
	}

	async getCourses() {
		const query = {
			text: 'select * from courses'
		}
		const result = await this._pool.query(query)
		return result
	}

	async getCourseById(id) {
		const query = {
			text: 'select * from courses where course_id = $1',
			values: [id]
		}
		const result = await this._pool.query(query)
		return result
	}
}

module.exports = CoursesService
