const {Pool} = require('pg')
const NotFoundError = require('../../exceptions/NotFoundError')
const { mapDBToModelCourses } = require('../../utils/mapDBToModel')

class CoursesService {
	constructor() {
		this._pool = new Pool()
	}

	async getCourses() {
		const query = {
			text: 'select * from courses'
		}
		const result = await this._pool.query(query)

		if (!result.rowCount) {
			throw new NotFoundError('Courses tidak ditemukan')
		}
		return result.rows.map(mapDBToModelCourses)
	}

	async getCourseById(id) {
		const query = {
			text: 'select * from courses where course_id = $1',
			values: [id]
		}
		const result = await this._pool.query(query)

		if (!result.rowCount) {
			throw new NotFoundError('Course tidak ditemukan')
		}
		return result.rows.map(mapDBToModelCourses)[0]
	}
}

module.exports = CoursesService
