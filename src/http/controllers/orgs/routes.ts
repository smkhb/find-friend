import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'
import { register } from '../pets/register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/authenticate', authenticate)
  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.post('/register', { onRequest: [verifyJWT] }, register)
}
