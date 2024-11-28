import { InMemoryORGSRepository } from '@/repositories/in-memory/in-memory-orgs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets'

let orgsRepository: InMemoryORGSRepository
let registerPetUseCase: RegisterPetUseCase
let petsRepository: InMemoryPetsRepository

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryORGSRepository()
    petsRepository = new InMemoryPetsRepository()
    registerPetUseCase = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a pet', async () => {
    const org = await orgsRepository.create({
      name: 'ORG Name',
      email: 'orgemail@gmail.com',
      password: '123456',
      whatsapp: '123456789',
      address: '123 Main St',
    })

    const { pet } = await registerPetUseCase.execute({
      name: 'ORG Name',
      age: 1,
      city: 'City',
      orgID: org.id,
    })

    expect(pet.org_id).toEqual(org.id)
  })
})
