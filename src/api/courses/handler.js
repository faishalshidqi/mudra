class CoursesHandler {
	constructor(service) {
		this._service = service
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
