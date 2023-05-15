const routes = (handler) => [
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
		handler: (request, h) => handler.editManagedCourseByIdHandler(request, h)
	},
	{
		method: 'DELETE',
		path: '/kll/courses/{id}',
		handler: (request, h) => handler.deleteManagedCourseByIdHandler(request, h)
	},
	{
		method: 'POST',
		path: '/kll/challenges',
		handler: (request, h) => handler.postManagedChallengeHandler(request, h)
	},
	{
		method: 'GET',
		path: '/kll/challenges',
		handler: (request, h) => handler.getManagedChallengesHandler(request, h)
	},
	{
		method: 'GET',
		path: '/kll/challenges/{id}',
		handler: (request, h) => handler.getManagedChallengeByIdHandler(request, h)
	},
	{
		method: 'PUT',
		path: '/kll/challenges/{id}',
		handler: (request, h) => handler.editManagedChallengeByIdHandler(request, h)
	},
	{
		method: 'DELETE',
		path: '/kll/challenges/{id}',
		handler: (request, h) => handler.deleteManagedChallengeByIdHandler(request, h)
	}
]

module.exports = routes
