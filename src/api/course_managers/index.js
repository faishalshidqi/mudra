const CourseManagersHandler = require('./handler')
const routes = require('./routes')

module.exports = {
	name: 'course_managers',
	version: '0.0.1',
	register: async (server, {service, usersService, validator}) => {
		const courseManagersHandler = new CourseManagersHandler(service, usersService, validator)
		server.route(routes(courseManagersHandler))
	}
}
