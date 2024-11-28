import { ORGSRepository } from '@/repositories/orgs-repository'
import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ORGADoesNotExistsError } from './errors/org-does-not-exist'

interface registerRequest {
  name: string
  age: number
  city: string
  orgID: string
}

interface registerResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private oRGSRepository: ORGSRepository,
  ) {}

  async execute({
    name,
    age,
    city,
    orgID,
  }: registerRequest): Promise<registerResponse> {
    const doesORGExists = await this.oRGSRepository.findByID(orgID)

    if (!doesORGExists) {
      throw new ORGADoesNotExistsError()
    }

    const pet = await this.petsRepository.register({
      name,
      age,
      city,
      org_id: orgID,
    })

    return { pet }
  }
}
