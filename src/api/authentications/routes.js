const routes = (handler) => [
  {
    method: 'POST',
    path: '/kll/authentications',
    handler: (request, h) => handler.postAuthenticationsHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/kll/authentications',
    handler: (request) => handler.putAuthenticationsHandler(request),
  },
  {
    method: 'DELETE',
    path: '/kll/authentications',
    handler: (request) => handler.deleteAuthenticationsHandler(request),
  },
];

module.exports = routes;
