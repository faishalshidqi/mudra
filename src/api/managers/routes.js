const routes = (handler) => [
	{
		method: 'GET',
		path: '/kll/dashboard',
		handler: (request, h) => handler.getDashboardInfoHandler(request, h)
	},
	{
		method: 'POST',
		path: '/kll/courses',
		handler: (request, h) => handler.postManagedCourseHandler(request, h)
	},
	{
		method: 'GET',
		path: '/kll/courses',
		handler: () => handler.getManagedCoursesHandler()
	},
	{
		method: 'GET',
		path: '/kll/courses/{id}',
		handler: (request, h) => handler.getManagedCourseByIdHandler(request, h)
	},
	{
		method: 'PUT',
		path: '/kll/courses/{id}',
		handler: (request, h) => handler.editCourseByIdHandler(request, h)
	},
	{
		method: 'DELETE',
		path: '/kll/courses/{id}',
		handler: (request, h) => handler.deleteCourseByIdHandler(request, h)
	}
]

module.exports = routes
