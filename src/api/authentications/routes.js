const routes = (handler) => [
	{
		method: 'POST',
		path: '/authentications',
		handler: (request, h) => handler.postAuthenticationsHandler(request, h),
	},
	{
		method: 'PUT',
		path: '/authentications',
		handler: (request) => handler.putAuthenticationsHandler(request),
	},
	{
		method: 'DELETE',
		path: '/authentications',
		handler: (request) => handler.deleteAuthenticationsHandler(request),
	},
]

module.exports = routes
