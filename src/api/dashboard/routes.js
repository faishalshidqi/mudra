const routes = (handler) => [
    {
        method: 'GET',
        path: '/kll/dashboard',
        handler: (request, h) => handler.getDashboardInfoHandler(request, h)
    }
]

module.exports = routes