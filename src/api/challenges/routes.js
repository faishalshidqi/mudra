const routes = (handler) => ([
	{
		method: 'GET',
		path: '/challenges',
		handler: (request) => handler.getChallengesHandler(request)
	},
	{
		method: 'GET',
		path: '/challenges/{id}',
		handler: (request, h) => handler.getChallengeByIdHandler(request, h)
	}
])

module.exports = routes
