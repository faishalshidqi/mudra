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

  async getCourseByIdHandler(request) {
    const {id} = request.params
    const data = await this._service.getCourseById(id)
    const course = data.rows
    return {
      status: 'success',
      data: {
        course
      }
    }
  }
}

module.exports = CoursesHandler
