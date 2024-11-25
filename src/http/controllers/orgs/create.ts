import { createORGFactory } from '@/factories/create-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createORGBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string().min(10),
    address: z.string().min(10),
  })

  const { name, email, password, whatsapp, address } =
    createORGBodySchema.parse(request.body)

  try {
    const createORG = createORGFactory()

    await createORG.execute({
      name,
      email,
      password,
      whatsapp,
      address,
    })
  } catch (err) {
    reply.status(409).send('ORG already registered')

    throw err
  }

  return reply.status(201).send('ORG created')
}
