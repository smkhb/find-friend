import { getPetsByAttributesFactory } from '@/factories/get-pets-by-attributes'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function attributes(request: FastifyRequest, reply: FastifyReply) {
  const petsByAttributesQuerySchema = z.object({
    city: z.string(),
    age: z.number().optional(),
  })
  const { city, age } = petsByAttributesQuerySchema.parse(request.query)

  const getPetsByAttributes = getPetsByAttributesFactory()

  const pets = await getPetsByAttributes.execute({
    city,
    age,
  })

  return reply.status(200).send({
    pets,
  })
}
