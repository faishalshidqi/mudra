const {Pool} = require('pg')
const {nanoid} = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");

class CoursesService {
	constructor() {
		this._pool = new Pool()
	}

	async getCourses() {
		const query = {
			text: 'select * from courses where is_deleted = false'
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
