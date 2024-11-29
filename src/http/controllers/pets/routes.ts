import { FastifyInstance } from 'fastify'
import { profile } from './profile'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/profile', profile)
}
