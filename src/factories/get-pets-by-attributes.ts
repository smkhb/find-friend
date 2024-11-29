import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets'
import { GetPetsByAttributesUseCase } from '@/use-cases/get-pets-by-attributes'

export function getPetsByAttributesFactory() {
  const petsRepository = new PrismaPetsRepository()
  const factory = new GetPetsByAttributesUseCase(petsRepository)

  return factory
}
