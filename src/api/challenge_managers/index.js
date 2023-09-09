const ChallengeManagersHandler = require('./handlers')
const routes = require('./routes')
module.exports = {
	name: 'challenge_managers',
	version: '0.0.1',
	register: async (server, {service, usersService, validator}) => {
		const challengeManagersHandler = new ChallengeManagersHandler(service, usersService, validator)
		server.route(routes(challengeManagersHandler))
	}
}
