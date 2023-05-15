const {Pool} = require('pg')
const {nanoid} = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class ManagersService {
	constructor() {
		this._pool = new Pool()
	}

	async getDashboardInfo(){
		const query = {
			text: 'select (select count(*) from challenges) as challenges_total, (select (select count(*) from courses) as courses_total)'
		}
		const result = await this._pool.query(query)
		return result
	}

	async addManagedCourse({title, sign_pict_link, description, type, is_deleted}){
		const id = nanoid(16)
		const created_at = new Date().toISOString()
		const updated_at = created_at

		const query = {
			text: 'insert into courses (course_id, title, sign_pict_link, description, type, created_at, updated_at, is_deleted) values($1, $2, $3, $4, $5, $6, $7, $8) returning course_id',
			values: [id, title, sign_pict_link, description, type, created_at, updated_at, is_deleted]
		}

		const result = await this._pool.query(query)
		if (!result.rows[0].course_id) {
			throw new InvariantError('Failed adding the course')
		}
		return result.rows[0].course_id
	}

	async getManagedCourses() {
		const query = {
			text: 'select * from courses'
		}
		const result = await this._pool.query(query)
		return result
	}

	async getManagedCourseById(id) {
		const query = {
			text: 'select * from courses where course_id = $1',
			values: [id]
		}
		const result = await this._pool.query(query)
		return result
	}

	async editManagedCourseById(id, {title, sign_pict_link, description, type, is_deleted}){
		const updated_at = new Date().toISOString()
		const query = {
			text: 'update courses set title = $1, sign_pict_link = $2, description = $3, type = $4, updated_at = $5, is_deleted = $6 where course_id = $7 returning course_id',
			values: [title, sign_pict_link, description, type, updated_at, is_deleted, id]
		}
		const result = await this._pool.query(query)
		if (!result.rows.length) {
			throw new NotFoundError('Cannot update a not found course')
		}
	}

	async deleteManagedCourseById(id){
		const query = {
			text: 'delete from courses where course_id = $1 returning course_id',
			values: [id]
		}
		const result = await this._pool.query(query)
		if (!result.rows.length) {
			throw new NotFoundError('Cannot delete not found course')
		}
	}
}

module.exports = ManagersService
