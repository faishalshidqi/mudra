const ClientError = require('../ClientError')


class CoursesHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator

		this.getCoursesHandler = this.getCoursesHandler.bind(this)
		this.getCourseByIdHandler = this.getCourseByIdHandler.bind(this)
	}

	async getCoursesHandler() {
		const courses = await this._service.getCourses()
		return {
			status: 'success',
			data: courses
		}
	}

	async getCourseByIdHandler(request, h) {
		try {
			const {id} = request.params
			const course = await this._service.getCourseById(id)
			return {
				status: 'success',
				data: {
					course
				}
			}
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response(
					{
						status: 'failed',
						message: error.message
					}
				)
				response.code(error.statusCode)
				return response
			}
			const response = h.response(
				{
					status: 'error',
					message: 'Sorry for the inconvenience, our server is having an error.'
				}
			)
			response.statusCode(500)
			return response
		}
	}
}

module.exports = CoursesHandler
