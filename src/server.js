require('dotenv').config()

const Hapi = require('@hapi/hapi')

const courses = require('./api/courses/index')
const CoursesService = require('./services/postgres/CoursesService')

const managers = require('./api/managers/index')
const ManagersService = require('./services/postgres/ManagersService')

//const uploads = require('./api/uploads/index')
//const UploadsService = require('./services/uploads/UploadsService')

const init = async () => {
	const coursesService = new CoursesService()
	const managersService = new ManagersService()
	//const uploadsService = new UploadsService()

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
			},
		},
		{
			plugin: managers,
			options: {
				service: managersService
			}
		},
		/*{
			plugin: uploads,
			options: {
				service: uploadsService
			}
		}*/
	])

	await server.start()
	console.log(`Server's running on ${server.info.uri}`)
}

init()
