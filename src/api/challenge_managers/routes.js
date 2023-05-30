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
		handler: (request, h) => handler.getManagedChallengeByIdHandler(request, h)
	},
	{
		method: 'PUT',
		path: '/kll/challenges/{id}',
		handler: (request, h) => handler.editManagedChallengeByIdHandler(request, h)
	},
	{
		method: 'DELETE',
		path: '/kll/challenges/{id}',
		handler: (request, h) => handler.deleteManagedChallengeByIdHandler(request, h)
	}
]

module.exports = routes
