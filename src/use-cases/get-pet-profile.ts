import { PetsRepository } from '@/repositories/pets-repository'
import { ORG, Pet } from '@prisma/client'
import { PetDoesNotExistsError } from './errors/pet-does-not-exist'
import { ORGSRepository } from '@/repositories/orgs-repository'
import { ORGDoesNotExistsError } from './errors/org-does-not-exist'

interface getProfileRequest {
  petID: string
  orgID: string
}

interface getProfileResponse {
  pet: Pet
  org: ORG
}

export class GetPetProfileUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private oRGSRepository: ORGSRepository,
  ) {}

  async execute({
    petID,
    orgID,
  }: getProfileRequest): Promise<getProfileResponse> {
    const pet = await this.petsRepository.findByID(petID)
    const org = await this.oRGSRepository.findByID(orgID)

    if (!org) {
      throw new ORGDoesNotExistsError()
    }
    if (!pet) {
      throw new PetDoesNotExistsError()
    }

    return { pet, org }
  }
}
