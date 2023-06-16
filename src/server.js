require('dotenv').config()

const Hapi = require('@hapi/hapi')
const ClientError = require('./exceptions/ClientError')

const courses = require('./api/courses')
const CoursesService = require('./services/postgres/CoursesService')

const challenges = require('./api/challenges')
const ChallengesService = require('./services/postgres/ChallengesService')

const course_managers = require('./api/course_managers')
const CourseManagersService = require('./services/postgres/CourseManagersService')
const CourseManagersValidator = require('./validator/course_managers')

const challenge_managers = require('./api/challenge_managers')
const ChallengeManagersService = require('./services/postgres/ChallengeManagersService')
const ChallengeManagersValidator = require('./validator/challenge_managers')

const dashboard = require('./api/dashboard')
const DashboardService = require('./services/postgres/DashboardService')

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const authentications = require('./api/authentications');
const AuthenticationsValidator = require('./validator/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');

const TokenManager = require('./tokenize/TokenManager');
const Jwt = require("@hapi/jwt");

const init = async () => {
	const coursesService = new CoursesService()
	const challengesService = new ChallengesService()
	const courseManagersService = new CourseManagersService()
	const challengeManagersService = new ChallengeManagersService()
	const dashboardService = new DashboardService()
	const usersService = new UsersService();
	const authenticationsService = new AuthenticationsService();

	const server = Hapi.server({
		port: process.env.PORT,
		host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
		routes : {
			cors: {
				origin: ['*']
			}
		}
	})

	await server.register(
		{
			plugin: Jwt
		}
	)

	server.auth.strategy('mudra_jwt', 'jwt', {
		keys: process.env.ACCESS_TOKEN_KEY,
		verify: {
			aud: false,
			iss: false,
			sub: false,
			maxAgeSec: process.env.ACCESS_TOKEN_AGE,
		},
		validate: (artifacts) => ({
			isValid: 'true',
			credentials: {
				id: artifacts.decoded.payload.id,
			},
		}),
	});

	await server.register([
		{
			plugin: courses,
			options: {
				service: coursesService
			},
		},
		{
			plugin: course_managers,
			options: {
				service: courseManagersService,
				validator: CourseManagersValidator
			}
		},
		{
			plugin: challenges,
			options: {
				service: challengesService
			}
		},
		{
			plugin: challenge_managers,
			options: {
				service: challengeManagersService,
				validator: ChallengeManagersValidator
			}
		},
		{
			plugin: dashboard,
			options: {
				service: dashboardService
			}
		},
		{
			plugin: users,
			options: {
				service: usersService,
				validator: UsersValidator,
			},
		},
		{
			plugin: authentications,
			options: {
				authenticationsService,
				usersService,
				tokenManager: TokenManager,
				validator: AuthenticationsValidator,
			},
		},
	])

	server.ext('onPreResponse', (request, h) => {
		const { response } = request
		if (response instanceof Error) {
			const {isServer, message, statusCode} = response
			if (response instanceof ClientError) {
				const newResponse = h.response({
					status: 'fail',
					message: message,
				})
				newResponse.code(statusCode)
				return newResponse
			}
			if (!isServer) {
				return h.continue
			}
			const newResponse = h.response({
				status: 'error',
				message: 'terjadi kegagalan pada server kami',
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

void init()
