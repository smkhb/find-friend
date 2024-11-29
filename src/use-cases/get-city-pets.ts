import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetsNotFoundError } from './errors/pets-not-found'

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
    if (!pets) {
      throw new PetsNotFoundError()
    }
    return { pets }
  }
}
