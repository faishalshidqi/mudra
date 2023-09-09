const routes = (handler) => [
	{
		method: 'GET',
		path: '/courses',
		handler: (request) => handler.getCoursesHandler(request),
		options: {
			auth: 'mudra_jwt'
		}
	},
	{
		method: 'GET',
		path: '/courses/{id}',
		handler: (request) => handler.getCourseByIdHandler(request),
		options: {
			auth: 'mudra_jwt'
		}
	}
]

module.exports = routes
