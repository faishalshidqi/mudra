const routes = (handler) => [
	{
		method: 'POST',
		path: '/users',
		handler: (request, h) => handler.postAdminUserHandler(request, h),
	}
]

module.exports = routes
