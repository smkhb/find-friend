import { getPetProfileFactory } from '@/factories/get-pet-profile'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const petProfileParamsSchema = z.object({
    petID: z.string().cuid(),
  })
  const { petID } = petProfileParamsSchema.parse(request.params)
  const getPetProfile = getPetProfileFactory()

  const pet = await getPetProfile.execute({
    petID,
  })

  return reply.status(200).send({
    pet,
  })
}
