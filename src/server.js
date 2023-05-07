require('dotenv').config()

const Hapi = require('@hapi/hapi')
const courses = require('./api/courses/index')
const CoursesService = require('./services/postgres/CoursesService')

const init = async () => {
	const coursesService = new CoursesService()

	const server = Hapi.server({
		port: process.env.PORT,
		host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
		routes : {
			cors: {
				origin: ['*']
			}
		}
	})

	await server.register([
		{
			plugin: courses,
			options: {
				service: coursesService
			}
		},
	])

	await server.start()
	console.log(`Server's running on ${server.info.uri}`)
}

init()
