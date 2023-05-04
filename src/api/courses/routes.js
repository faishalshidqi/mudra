const routes = (handler) => [
	{
		method: 'GET',
		path: '/courses',
		handler: handler.getCoursesHandler
	},
	{
		method: 'GET',
		path: '/courses/{id}',
		handler: handler.getCourseByIdHandler
	}
]

module.exports = routes
