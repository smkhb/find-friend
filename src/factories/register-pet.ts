import { PrismaORGSRepository } from '@/repositories/prisma/prisma-orgs'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets'
import { RegisterPetUseCase } from '@/use-cases/register-pet'

export function registerPetFactory() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaORGSRepository()
  const factory = new RegisterPetUseCase(petsRepository, orgsRepository)

  return factory
}
