import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets'
import { GetCityPetsUseCase } from '@/use-cases/get-city-pets'

export function getCityPetsFactory() {
  const petsRepository = new PrismaPetsRepository()
  const factory = new GetCityPetsUseCase(petsRepository)

  return factory
}
