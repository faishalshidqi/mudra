const routes = (handler) => [
  {
    method: 'POST',
    path: '/kll/users',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
];

module.exports = routes;
