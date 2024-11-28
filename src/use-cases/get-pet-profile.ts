import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetDoesNotExistsError } from './errors/pet-does-not-exist'

interface getProfileRequest {
  petID: string
}

interface getProfileResponse {
  pet: Pet
}

export class GetProfileUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petID }: getProfileRequest): Promise<getProfileResponse> {
    const pet = await this.petsRepository.findByID(petID)

    if (!pet) {
      throw new PetDoesNotExistsError()
    }

    return { pet }
  }
}
