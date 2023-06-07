const ClientError = require('../../exceptions/ClientError')

class CourseManagersHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator
	}

	async postManagedCourseHandler(request, h){
		this._validator.validateCourseManagerPayload(request.payload)
		const {course_id} = await this._service.addManagedCourse(request.payload)
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

	async getManagedCoursesHandler(request){
		const {type} = request.query
		if (!type) {
			const courses = await this._service.getManagedCourses()
			return {
				status: 'success',
				data: {
					courses
				}
			}
		}

		const courses = await this._service.getManagedCoursesByType(type)
		return {
			status: 'success',
			data: {
				courses
			}
		}

	}

	async getManagedCoursesInfoHandler(){
		const courses = await this._service.getAllManagedCoursesInfo()
		return {
			status: 'success',
			data: {
				courses
			}
		}
	}

	async getManagedCourseByIdHandler(request, h){
		const {id} = request.params
		const course = await this._service.getManagedCourseById(id)
		return {
			status: 'success',
			data: {
				course
			}
		}

	}

	async editManagedCourseByIdHandler(request, h) {
		this._validator.validateCourseManagerPayload(request.payload)
		const {id} = request.params

		await this._service.editManagedCourseById(id, request.payload)
		return {
			status: 'success',
			message: 'Course is successfully altered'
		}

	}

	async deleteManagedCourseByIdHandler(request, h){
		const {id} = request.params

		await this._service.deleteManagedCourseById(id)
		return {
			status: 'success',
			message: 'Course is successfully removed'
		}

	}
}

module.exports = CourseManagersHandler
