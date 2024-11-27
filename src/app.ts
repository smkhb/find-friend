import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(orgsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'internal server error' })
})
