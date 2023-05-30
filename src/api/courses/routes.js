const routes = (handler) => [
	{
		method: 'GET',
		path: '/courses',
		handler: (request) => handler.getCoursesHandler(request)
	},
	{
		method: 'GET',
		path: '/courses/{id}',
		handler: (request) => handler.getCourseByIdHandler(request)
	}
]

module.exports = routes
