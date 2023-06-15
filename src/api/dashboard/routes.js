const routes = (handler) => [
	{
		method: 'GET',
		path: '/kll/dashboard',
		handler: () => handler.getDashboardInfoHandler()
	}
]

module.exports = routes