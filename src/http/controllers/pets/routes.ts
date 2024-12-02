import { FastifyInstance } from 'fastify'
import { profile } from './profile'
import { city } from './city'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { register } from './register'
import { attributes } from './attributes'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/profile/:id', profile)
  app.get('/city', city)
  app.get('/attributes', attributes)

  /** Authenticated */
  app.post('/register', { onRequest: [verifyJWT] }, register)
}
