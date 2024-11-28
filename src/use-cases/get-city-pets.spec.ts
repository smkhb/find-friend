import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets'
import { describe, beforeEach, it, expect } from 'vitest'
import { GetCityPetsUseCase } from './get-city-pets'

let inMemoryPetsRepository: InMemoryPetsRepository
let getCityPetsUseCase: GetCityPetsUseCase

describe('Get pets from same City', () => {
  beforeEach(async () => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    getCityPetsUseCase = new GetCityPetsUseCase(inMemoryPetsRepository)

    for (let i = 1; i <= 10; i++) {
      await inMemoryPetsRepository.register({
        id: `pet-${i}`,
        name: `Pet Name ${i}`,
        age: i,
        city: 'Atlanta',
        org_id: `org-${i}`,
      })
    }
  })

  it('should be able to get a list of pets from the same city', async () => {
    const listOfPets = await getCityPetsUseCase.execute({ city: 'Atlanta' })

    expect(listOfPets.pets.length).toEqual(10)
    expect(listOfPets.pets[0].city).toEqual('Atlanta')
  })
})
