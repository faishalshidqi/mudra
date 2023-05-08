const ChallengesHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'challenges',
  register: async (server, { service }) => {
    const challengesHandler = new ChallengesHandler(service)
    server.route(routes(challengesHandler))
  }
}