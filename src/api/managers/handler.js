const ClientError = require('../../exceptions/ClientError')

class ManagersHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator
	}

	async postManagedCourseHandler(request, h){
		try {
			this._validator.validateCourseManagerPayload(request.payload)

			const {title, sign_pict_link, description, type, is_deleted} = request.payload
			const course_id = await this._service.addManagedCourse({
				title, sign_pict_link, description, type, is_deleted
			})
			const response = h.response({
				status: 'success',
				message: 'Course is added successfully',
				data: {
					course_id
				}
			})
			response.code(201)
			return response
		}
		catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'failed',
					message: error.message
				})
				response.code(error.statusCode)
				return response
			}
			const response = h.response({
				status: 'error',
				// message: 'Sorry for the inconvenience, our server is having an error.'
				message: error.message
			})
			response.code(500)
			return response
		}
	}
	async getDashboardInfoHandler() {
		const info = (await this._service.getDashboardInfo()).rows[0]
		return {
			status: 'success',
			data: info
		}
	}

	async getManagedCoursesHandler(){
		const courses = (await this._service.getManagedCourses()).rows
		return {
			status: 'success',
			data: {
				courses
			}
		}
	}

	async getManagedCourseByIdHandler(request, h){
		try {
			const {id} = request.params
			const course = ((await this._service.getManagedCourseById(id)).rows)[0]
			return {
				status: 'success',
				data: {
					course
				}
			}
		}
		catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'failed',
					message: error.message
				})
				response.code(error.statusCode)
				return response
			}
			const response = h.response({
				status: 'error',
				message: 'Sorry for the inconvenience, our server is having an error.'
			})
			response.code(500)
			console.error(error)
			return response
		}
	}

	async editCourseByIdHandler(request, h) {
		try {
			this._validator.validateCourseManagerPayload(request.payload)
			const {id} = request.params

			await this._service.editManagedCourseById(id, request.payload)
			return {
				status: 'success',
				message: 'Course is successfully altered'
			}
		}
		catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'failed',
					message: error.message
				})
				response.code(error.statusCode)
				return response
			}
			const response = h.response({
				status: 'error',
				message: 'Sorry for the inconvenience, our server is having an error.'
			})
			response.code(500)
			console.error(error)
			return response
		}
	}

	async deleteCourseByIdHandler(request, h){
		try {
			const {id} = request.params

			await this._service.deleteManagedCourseById(id)
			return {
				status: 'success',
				message: 'Course is successfully removed'
			}
		}
		catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'failed',
					message: error.message
				})
				response.code(error.statusCode)
				return response
			}
			const response = h.response({
				status: 'error',
				message: 'Sorry for the inconvenience, our server is having an error.'
			})
			response.code(500)
			console.error(error)
			return response
		}
	}
}

module.exports = ManagersHandler
