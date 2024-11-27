import { InMemoryORGSRepository } from '@/repositories/in-memory/in-memory-orgs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateORGUseCase } from './authenticate-org'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryORGSRepository
let authenticateORGUseCase: AuthenticateORGUseCase

describe('Authenticate ORG Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryORGSRepository()
    authenticateORGUseCase = new AuthenticateORGUseCase(orgsRepository)
  })

  it('should authenticate an ORG', async () => {
    await orgsRepository.create({
      name: 'ORG Name',
      email: 'orgemail@gmail.com',
      password: await hash('123456', 6),
      whatsapp: '123456789',
      address: '123 Main St',
    })

    const { org } = await authenticateORGUseCase.execute({
      email: 'orgemail@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
