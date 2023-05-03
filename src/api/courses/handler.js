class CoursesHandler {
    constructor(service, validator) {
        this._service = service
        this._validator = validator

        this.getCoursesHandler = this.getCoursesHandler.bind(this)
        this.getCourseByIdHandler = this.getCourseByIdHandler.bind(this)
    }


}
