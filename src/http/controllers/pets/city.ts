import { getCityPetsFactory } from '@/factories/get-city-pets'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function city(request: FastifyRequest, reply: FastifyReply) {
  const cityPetsQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { city, page } = cityPetsQuerySchema.parse(request.query)
  const getCityPets = getCityPetsFactory()

  const cities = await getCityPets.execute({
    city,
    page,
  })

  return reply.status(200).send({
    cities,
  })
}
