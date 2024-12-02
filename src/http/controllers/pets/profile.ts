import { getPetProfileFactory } from '@/factories/get-pet-profile'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const petProfileParamsSchema = z.object({
    petID: z.string().cuid(),
    orgID: z.string().cuid(),
  })
  const { petID, orgID } = petProfileParamsSchema.parse(request.params)
  const getPetProfile = getPetProfileFactory()

  const pet = await getPetProfile.execute({
    petID,
    orgID,
  })

  return reply.status(200).send({
    pet,
  })
}
