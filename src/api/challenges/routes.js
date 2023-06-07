const routes = (handler) => ([
	{
		method: 'GET',
		path: '/challenges',
		handler: (request) => handler.getChallengesHandler(request)
	},
	{
		method: 'GET',
		path: '/challenges/{id}',
		handler: (request) => handler.getChallengeByIdHandler(request)
	}
])

module.exports = routes
