const DashboardHandler = require('./handler')
const routes = require('./routes')
module.exports = {
	name: 'dashboard',
	version: '0.0.1',
	register: async (server, { service }) => {
		const dashboardHandler = new DashboardHandler(service)
		server.route(routes(dashboardHandler))
	}
}