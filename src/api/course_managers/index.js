const CourseManagersHandler = require('./handler')
const routes = require('./routes')

module.exports = {
	name: 'course_managers',
	version: '0.0.1',
	register: async (server, {service, validator}) => {
		const courseManagersHandler = new CourseManagersHandler(service, validator)
		server.route(routes(courseManagersHandler))
	}
}
