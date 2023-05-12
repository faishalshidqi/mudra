const CoursesHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'courses',
  version: '0.0.1',
  register: async (server, { service }) => {
    const coursesHandler = new CoursesHandler(service)
    server.route(routes(coursesHandler))
  }
}
