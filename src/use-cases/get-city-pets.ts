import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface getCityPetsRequest {
  city: string
}

interface getCityPetsResponse {
  pets: Pet[]
}

export class GetCityPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: getCityPetsRequest): Promise<getCityPetsResponse> {
    const pets = await this.petsRepository.findByCity(city)

    return { pets }
  }
}
