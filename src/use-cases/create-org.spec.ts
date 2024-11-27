import { InMemoryORGSRepository } from '@/repositories/in-memory/in-memory-orgs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateORGUseCase } from './create-org'

let orgsRepository: InMemoryORGSRepository
let createORGUseCase: CreateORGUseCase
describe('Create ORG Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryORGSRepository()
    createORGUseCase = new CreateORGUseCase(orgsRepository)
  })

  it('should create a new ORG', async () => {
    const org = await createORGUseCase.execute({
      name: 'ORG Name',
      email: 'orgemail@gmail.com',
      password: '123456',
      whatsapp: '123456789',
      address: '123 Main St',
    })

    expect(org).toEqual(expect.anything())
  })
})
