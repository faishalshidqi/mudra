const routes = (handler) => [
  {
    method: 'GET',
    path: '/courses',
    handler: () => handler.getCoursesHandler()
  },
  {
    method: 'GET',
    path: '/courses/{id}',
    handler: (request) => handler.getCourseByIdHandler(request)
  }
]

module.exports = routes
