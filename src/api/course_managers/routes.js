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
		handler: (request) => handler.getManagedCourseByIdHandler(request)
	},
	{
		method: 'PUT',
		path: '/kll/courses/{id}',
		handler: (request) => handler.editManagedCourseByIdHandler(request)
	},
	{
		method: 'DELETE',
		path: '/kll/courses/{id}',
		handler: (request) => handler.deleteManagedCourseByIdHandler(request)
	},
]

module.exports = routes
