const UploadsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
	name: 'uploads',
	version: '0.0.1',
	register: async (server, {service}) => {
		const uploadsHandler = new UploadsHandler(service)
		server.route(routes(uploadsHandler))
	}
}
