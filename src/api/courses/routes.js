const routes = (handler) => [
	{
		method: 'GET',
		path: '/courses',
		handler: (request, h) => handler.getCoursesHandler(request, h)
	},
	{
		method: 'GET',
		path: '/courses/{id}',
		handler: (request, h) => handler.getCourseByIdHandler(request, h)
	},
]

module.exports = routes
