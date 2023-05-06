require('dotenv').config()

const Hapi = require('@hapi/hapi')
//const routes = require('src/api/courses/routes')
const courses = require('./api/courses/index')

const CoursesService = require('./services/postgres/CoursesService')
const challenges = require('./api/challenges')
const ChallengesService = require('./services/postgres/ChallengesService')

const init = async () => {
  const coursesService = new CoursesService()
  const challengesService = new ChallengesService()

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
    }
  ])

  await server.start()
  console.log(`Server's running on ${server.info.uri}`)
}

init()