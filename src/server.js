require('dotenv').config()

const Hapi = require('@hapi/hapi')

const courses = require('./api/courses/index')
const CoursesService = require('./services/postgres/CoursesService')
const challenges = require('./api/challenges')
const ChallengesService = require('./services/postgres/ChallengesService')
const ClientError = require('./exceptions/ClientError')

const managers = require('./api/managers/index')
const ManagersService = require('./services/postgres/ManagersService')
const CourseManagersValidator = require('./validator/course_managers')

//const uploads = require('./api/uploads/index')
//const UploadsService = require('./services/uploads/UploadsService')

const init = async () => {
	const coursesService = new CoursesService()
	const challengesService = new ChallengesService()
	const managersService = new ManagersService()

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
			plugin: challenges,
			options: {
				service: challengesService
			}
		},
		{
			plugin: managers,
			options: {
				service: managersService,
				validator: CourseManagersValidator
			}
		}
	])

	server.ext('onPreResponse', (request, h) => {
		const { response } = request
		if (response instanceof Error) {
			if (response instanceof ClientError) {
				const newResponse = h.response({
					status: 'fail',
					message: response.message
				})
				newResponse.code(response.statusCode)
				return newResponse
			}

			if (!response.isServer) {
				return h.continue
			}

			const newResponse = h.response({
				status: 'error',
				message: 'terjadi kegagalan di server kami'
			})
			newResponse.code(500)
			return newResponse
		}
		return h.continue
	})

	await server.start()
	// eslint-disable-next-line no-console
	console.log(`Server's running on ${server.info.uri}`)
}

init()
