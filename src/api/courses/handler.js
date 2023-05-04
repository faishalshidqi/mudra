const ClientError = require('../../exceptions/ClientError')


class CoursesHandler {
	constructor(service, /*validator*/) {
		this._service = service
		//this._validator = validator
	}

	async getCoursesHandler() {
		const data = await this._service.getCourses()
		const courses = data.rows
		return {
			status: 'success',
			data: courses
		}
	}

	async getCourseByIdHandler(request, h) {
		try {
			const {id} = request.params
			const data = await this._service.getCourseById(id)
			const course = data.rows
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
					//message: 'Sorry for the inconvenience, our server is having an error.'
					message: error.message
				}
			)
			response.code(500)
			return response
		}
	}
}

module.exports = CoursesHandler
