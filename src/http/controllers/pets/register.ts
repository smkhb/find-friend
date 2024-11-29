import { registerPetFactory } from '@/factories/register-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string().min(3),
    age: z.number().int().min(0),
    city: z.string().min(3),
  })

  const { name, age, city } = createPetBodySchema.parse(request.body)

  const registerPet = registerPetFactory()

  await registerPet.execute({
    name,
    age,
    city,
    orgID: request.user.sub,
  })

  return reply.status(200).send({ message: 'Pet registered' })
}
