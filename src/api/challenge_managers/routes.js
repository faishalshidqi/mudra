const routes = (handler) => [
	{
		method: 'POST',
		path: '/kll/challenges',
		handler: (request, h) => handler.postManagedChallengeHandler(request, h)
	},
	{
		method: 'GET',
		path: '/kll/challenges',
		handler: (request) => handler.getManagedChallengesHandler(request)
	},
	{
		method: 'GET',
		path: '/kll/challenges/{id}',
		handler: (request) => handler.getManagedChallengeByIdHandler(request)
	},
	{
		method: 'PUT',
		path: '/kll/challenges/{id}',
		handler: (request) => handler.editManagedChallengeByIdHandler(request)
	},
	{
		method: 'DELETE',
		path: '/kll/challenges/{id}',
		handler: (request) => handler.deleteManagedChallengeByIdHandler(request)
	}
]

module.exports = routes
