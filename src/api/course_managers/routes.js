const routes = (handler) => [
	{
		method: 'POST',
		path: '/kll/courses',
		handler: (request, h) => handler.postManagedCourseHandler(request, h),
		options: {
			auth: 'mudra_jwt',
		},
	},
	{
		method: 'GET',
		path: '/kll/courses',
		handler: (request) => handler.getManagedCoursesHandler(request),
		options: {
			auth: 'mudra_jwt',
		},
	},
	{
		method: 'GET',
		path: '/kll/courses/info',
		handler: () => handler.getManagedCoursesInfoHandler(),
		options: {
			auth: 'mudra_jwt',
		},
	},
	{
		method: 'GET',
		path: '/kll/courses/{id}',
		handler: (request) => handler.getManagedCourseByIdHandler(request),
		options: {
			auth: 'mudra_jwt',
		},
	},
	{
		method: 'PUT',
		path: '/kll/courses/{id}',
		handler: (request) => handler.editManagedCourseByIdHandler(request),
		options: {
			auth: 'mudra_jwt',
		},
	},
	{
		method: 'DELETE',
		path: '/kll/courses/{id}',
		handler: (request) => handler.deleteManagedCourseByIdHandler(request),
		options: {
			auth: 'mudra_jwt',
		},
	},
]

module.exports = routes
