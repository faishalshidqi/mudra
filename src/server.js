const Hapi = require('@hapi/hapi')
const routes = require('src/api/courses/routes')
const courses = require('./api/courses/index')

const init = async () => {
    const coursesService = new CoursesService()

    const server = Hapi.server({
        port: 8080,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes : {
            cors: {
                origin: {
                    origin: ['*']
                }
            }
        }
    })

    server.route(routes)

    await server.register({
        plugin: courses,
        options: {
            service: coursesService
        }
    })

    await server.start()
    console.log(`Server's running on ${server.info.uri}`)
}

init()
