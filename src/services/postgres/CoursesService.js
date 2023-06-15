const {Pool} = require('pg')
const NotFoundError = require('../../exceptions/NotFoundError')
const { mapDBToModelCourses } = require('../../utils/mapDBToModel')

class CoursesService {
	constructor() {
		this._pool = new Pool()
	}

	async getCourses() {
		const query = {
			text: 'select * from courses where is_deleted = false order by type, title'
		}
		const result = await this._pool.query(query)
		if (!result.rowCount) {
			throw new NotFoundError('Courses tidak ditemukan')
		}
		return result.rows.map(mapDBToModelCourses)
	}

	async getCourseById(id) {
		const query = {
			text: 'select * from courses where course_id = $1 and is_deleted = false',
			values: [id]
		}
		const result = await this._pool.query(query)

		if (!result.rowCount) {
			throw new NotFoundError('Course tidak ditemukan')
		}
		return result.rows.map(mapDBToModelCourses)[0]
	}

	async getCoursesByType(type) {
		const query = {
			text: 'select * from courses where type = $1 and is_deleted = false order by title',
			values: [type]
		}
		const result = await this._pool.query(query)
		if (!result.rowCount) {
			throw new NotFoundError('Course tidak ditemukan')
		}
		return result.rows.map(mapDBToModelCourses)
	}
}

module.exports = CoursesService
