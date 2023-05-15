const routes = (handler) => ([
	{
		method: 'GET',
		path: '/challenges',
		handler: () => handler.getChallengesHandler()
	},
	{
		method: 'GET',
		path: '/challenges/{id}',
		handler: (request, h) => handler.getChallengeByIdHandler(request, h)
	}
])

module.exports = routes