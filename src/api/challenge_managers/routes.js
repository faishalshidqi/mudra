const routes = (handler) => [
	{
		method: 'POST',
		path: '/kll/challenges',
		handler: (request, h) => handler.postManagedChallengeHandler(request, h),
		options: {
			auth: 'mudra_jwt',
		},
	},
	{
		method: 'GET',
		path: '/kll/challenges',
		handler: (request) => handler.getManagedChallengesHandler(request),
		options: {
			auth: 'mudra_jwt',
		},
	},
	{
		method: 'GET',
		path: '/kll/challenges/{id}',
		handler: (request) => handler.getManagedChallengeByIdHandler(request),
		options: {
			auth: 'mudra_jwt',
		},
	},
	{
		method: 'PUT',
		path: '/kll/challenges/{id}',
		handler: (request) => handler.editManagedChallengeByIdHandler(request),
		options: {
			auth: 'mudra_jwt',
		},
	},
	{
		method: 'DELETE',
		path: '/kll/challenges/{id}',
		handler: (request) => handler.deleteManagedChallengeByIdHandler(request),
		options: {
			auth: 'mudra_jwt',
		},
	}
]

module.exports = routes
