import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets'
import { describe, beforeEach, it, expect } from 'vitest'
import { GetPetsByAttributesUseCase } from './get-pets-by-attributes'

let inMemoryPetsRepository: InMemoryPetsRepository
let getPetsByAttributes: GetPetsByAttributesUseCase

describe('Filter pets by attributes', () => {
  beforeEach(async () => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    getPetsByAttributes = new GetPetsByAttributesUseCase(inMemoryPetsRepository)

    await Promise.all([
      ...Array.from({ length: 5 }, (_, i) =>
        inMemoryPetsRepository.register({
          id: `pet-${i + 1}`,
          name: `Pet Name ${i + 1}`,
          age: 4,
          city: 'Atlanta',
          org_id: `org-${i + 1}`,
        }),
      ),
      ...Array.from({ length: 5 }, (_, i) =>
        inMemoryPetsRepository.register({
          id: `pet-${i + 1}`,
          name: `Pet Name ${i + 1}`,
          age: 4,
          city: 'Boston',
          org_id: `org-${i + 1}`,
        }),
      ),
    ])
  })

  it('should be able to get a list of pets from the same city', async () => {
    const listOfPets = await getPetsByAttributes.execute({
      city: 'Atlanta',
      age: 4,
    })

    expect(listOfPets.pets.length).toEqual(5)
    expect(listOfPets.pets[0].age).toEqual(4)
    expect(listOfPets.pets[0].city).toEqual('Atlanta')
  })
})
