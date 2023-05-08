const ManagersHandler = require('./handler')
const routes = require('./routes')

module.exports = {
    name: 'managers',
    version: '0.0.1',
    register: async (server, {service}) => {
        const managersHandler = new ManagersHandler(service)
        server.route(routes(managersHandler))
    }
}
