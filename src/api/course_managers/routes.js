const routes = (handler) => [
	{
		method: 'POST',
		path: '/kll/courses',
		handler: (request, h) => handler.postManagedCourseHandler(request, h)
	},
	{
		method: 'GET',
		path: '/kll/courses',
		handler: (request) => handler.getManagedCoursesHandler(request)
	},
	{
		method: 'GET',
		path: '/kll/courses/info',
		handler: () => handler.getManagedCoursesInfoHandler()
	},
	{
		method: 'GET',
		path: '/kll/courses/{id}',
		handler: (request, h) => handler.getManagedCourseByIdHandler(request, h)
	},
	{
		method: 'PUT',
		path: '/kll/courses/{id}',
		handler: (request, h) => handler.editManagedCourseByIdHandler(request, h)
	},
	{
		method: 'DELETE',
		path: '/kll/courses/{id}',
		handler: (request, h) => handler.deleteManagedCourseByIdHandler(request, h)
	},
]

module.exports = routes
