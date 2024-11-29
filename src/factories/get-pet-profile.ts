import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets'
import { GetPetProfileUseCase } from '@/use-cases/get-pet-profile'

export function getPetProfileFactory() {
  const petsRepository = new PrismaPetsRepository()
  const factory = new GetPetProfileUseCase(petsRepository)

  return factory
}
