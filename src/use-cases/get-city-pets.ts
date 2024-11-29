import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface getCityPetsRequest {
  city: string
  page: number
}

interface getCityPetsResponse {
  pets: Pet[]
}

export class GetCityPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: getCityPetsRequest): Promise<getCityPetsResponse> {
    const pets = await this.petsRepository.findManyByCity(city, page || 1)

    return { pets }
  }
}
