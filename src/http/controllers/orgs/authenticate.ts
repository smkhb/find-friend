import { authenticateORGFactory } from '@/factories/authenticate-og'
import { InvalidORGCredentialsError } from '@/use-cases/errors/invalid-org-credentials'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateORGBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateORGBodySchema.parse(request.body)

  try {
    const authenticateORG = authenticateORGFactory()

    await authenticateORG.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidORGCredentialsError) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send('ORG authenticated')
}
