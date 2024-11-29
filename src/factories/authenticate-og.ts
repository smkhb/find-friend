import { PrismaORGSRepository } from '@/repositories/prisma/prisma-orgs'
import { AuthenticateORGUseCase } from '@/use-cases/authenticate-org'

export function authenticateORGFactory() {
  const orgsRepository = new PrismaORGSRepository()
  const factory = new AuthenticateORGUseCase(orgsRepository)

  return factory
}
