import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetsNotFoundError } from './errors/pets-not-found'

interface getPetsByAttributesRequest {
  city: string
  age?: number
}

interface getPetsByAttributesResponse {
  pets: Pet[]
}

export class GetPetsByAttributesUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
  }: getPetsByAttributesRequest): Promise<getPetsByAttributesResponse> {
    const pets = await this.petsRepository.filterByAttributes({ city, age })
    if (!pets) throw new PetsNotFoundError()
    return { pets }
  }
}
