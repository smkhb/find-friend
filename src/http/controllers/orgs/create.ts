import { createORGFactory } from '@/factories/create-org'
import { ORGAlreadyExistsError } from '@/use-cases/errors/org-already-exists'
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
    if (err instanceof ORGAlreadyExistsError) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send('ORG created')
}
