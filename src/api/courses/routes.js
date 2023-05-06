const routes = (handler) => [
	{
		method: 'GET',
		path: '/courses',
		handler: () => handler.getCoursesHandler()
	},
	{
		method: 'GET',
		path: '/courses/{id}',
		handler: (request, h) => handler.getCourseByIdHandler(request, h)
	},
	{
		method: 'POST',
		path: '/courses',
		handler: (request, h) => handler.postCourseHandler(request, h)
	}
]

module.exports = routes
