class CourseManagersHandler {
	constructor(service, usersService, validator) {
		this._service = service
		this._usersService = usersService
		this._validator = validator
	}

	async postManagedCourseHandler(request, h){
		const {id} = request.auth.credentials
		await this._usersService.verifyAdminRole(id)
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
		const {id} = request.auth.credentials
		await this._usersService.verifyAdminRole(id)

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

	async getManagedCoursesInfoHandler(request){
		const {id} = request.auth.credentials
		await this._usersService.verifyAdminRole(id)
		const courses = await this._service.getAllManagedCoursesInfo()
		return {
			status: 'success',
			data: {
				courses
			}
		}
	}

	async getManagedCourseByIdHandler(request){
		const {id: user_id} = request.auth.credentials
		await this._usersService.verifyAdminRole(user_id)
		const {id} = request.params
		const course = await this._service.getManagedCourseById(id)
		return {
			status: 'success',
			data: {
				course
			}
		}

	}

	async editManagedCourseByIdHandler(request) {
		const {id: user_id} = request.auth.credentials
		await this._usersService.verifyAdminRole(user_id)
		this._validator.validateCourseManagerPayload(request.payload)
		const {id} = request.params

		await this._service.editManagedCourseById(id, request.payload)
		return {
			status: 'success',
			message: 'Course is successfully altered'
		}

	}

	async deleteManagedCourseByIdHandler(request){
		const {id: user_id} = request.auth.credentials
		await this._usersService.verifyAdminRole(user_id)
		const {id} = request.params

		await this._service.deleteManagedCourseById(id)
		return {
			status: 'success',
			message: 'Course is successfully removed'
		}

	}
}

module.exports = CourseManagersHandler
