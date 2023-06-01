class CoursesHandler {
	constructor(service) {
		this._service = service
	}
	async getCoursesHandler(request) {
		const {type} = request.query
		if (type == null) {
			const courses = await this._service.getCourses(type)
			return {
				status: 'success',
				data: {
					courses
				}
			}
		}
		else {
			const courses = await this._service.getCoursesByType(type)
			return {
				status: 'success',
				data: {
					courses
				}
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

	async getCoursesByTypeHandler(request) {
		const {type} = request.params
		const courses = await this._service.getCoursesByType(type)
		return {
			status: 'success',
			data: courses
		}
	}
}

module.exports = CoursesHandler
