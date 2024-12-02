import { PrismaORGSRepository } from '@/repositories/prisma/prisma-orgs'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets'
import { GetPetProfileUseCase } from '@/use-cases/get-pet-profile'

export function getPetProfileFactory() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaORGSRepository()
  const factory = new GetPetProfileUseCase(petsRepository, orgsRepository)

  return factory
}
