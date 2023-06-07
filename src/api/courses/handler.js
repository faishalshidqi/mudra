class CoursesHandler {
	constructor(service) {
		this._service = service
	}
	async getCoursesHandler(request) {
		const {type} = request.query
		if (!type) {
			const courses = await this._service.getCourses(type)
			return {
				status: 'success',
				data: {
					courses
				}
			}
		}
		const courses = await this._service.getCoursesByType(type)
		return {
			status: 'success',
			data: {
				courses
			}
		}

	}

	async getCourseByIdHandler(request) {
		const {id} = request.params
		const course = await this._service.getCourseById(id)
		return {
			status: 'success',
			data: {
				course
			}
		}
	}
}

module.exports = CoursesHandler
