require('dotenv').config()

const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const courses = require('./api/courses/index')
const CoursesService = require('./services/postgres/CoursesService')

const uploads = require('./api/uploads')
const StorageService = require('./services/gcp/StorageService')

const init = async () => {
	const coursesService = new CoursesService()
	const storageService = new StorageService()

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
		{
			plugin: uploads,
			options: {
				service: storageService
			}
		}
	])

	await server.start()
	console.log(`Server's running on ${server.info.uri}`)
}

init()
