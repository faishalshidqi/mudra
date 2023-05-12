class CoursesHandler {
	constructor(service, /*validator*/) {
		this._service = service
		//this._validator = validator
	}
	async getCoursesHandler() {
		const courses = await this._service.getCourses()
		return {
			status: 'success',
			data: courses
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
