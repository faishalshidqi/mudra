const routes = (handler) => [
	{
		method: 'GET',
		path: '/kll/dashboard',
		handler: () => handler.getDashboardInfoHandler(),
		options: {
			auth: 'mudra_jwt',
		},
	}
]

module.exports = routes