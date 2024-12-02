import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets'
import { GetPetProfileUseCase } from './get-pet-profile'
import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryORGSRepository } from '@/repositories/in-memory/in-memory-orgs'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryORGSRepository: InMemoryORGSRepository
let getPetProfileUseCase: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(async () => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryORGSRepository = new InMemoryORGSRepository()
    getPetProfileUseCase = new GetPetProfileUseCase(
      inMemoryPetsRepository,
      inMemoryORGSRepository,
    )

    const org = await inMemoryORGSRepository.create({
      name: 'ORG Name',
      email: 'orgemail@gmail.com',
      password: '123456',
      whatsapp: '123456789',
      address: '123 Main St',
    })

    await inMemoryPetsRepository.register({
      id: 'pet-1',
      name: 'Pet Name',
      age: 5,
      city: 'City Name',
      org_id: org.id,
    })
  })

  it('should be able to get a pet profile', async () => {
    const { pet } = await getPetProfileUseCase.execute({
      petID: 'pet-1',
      orgID: 'org-1',
    })

    expect(pet.name).toEqual('Pet Name')
    expect(pet.id).toEqual('pet-1')
  })
})
