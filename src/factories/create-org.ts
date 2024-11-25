import { PrismaORGSRepository } from '@/repositories/prisma/prisma-orgs'
import { CreateORGUseCase } from '@/use-cases/create-org'

export function createORGFactory() {
  const orgsRepository = new PrismaORGSRepository()
  const factory = new CreateORGUseCase(orgsRepository)

  return factory
}
