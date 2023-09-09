const routes = (handler) => ([
	{
		method: 'GET',
		path: '/challenges',
		handler: (request) => handler.getChallengesHandler(request),
		options: {
			auth: 'mudra_jwt'
		}
	},
	{
		method: 'GET',
		path: '/challenges/{id}',
		handler: (request) => handler.getChallengeByIdHandler(request),
		options: {
			auth: 'mudra_jwt'
		}
	}
])

module.exports = routes
