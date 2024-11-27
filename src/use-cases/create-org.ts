import { ORGSRepository } from '@/repositories/orgs-repository'
import { ORG } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ORGAlreadyExistsError } from './errors/org-already-exists'

interface createRequest {
  name: string
  email: string
  password: string
  whatsapp: string
  address: string
}

interface createResponse {
  org: ORG
}

export class CreateORGUseCase {
  constructor(private oRGSRepository: ORGSRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp,
    address,
  }: createRequest): Promise<createResponse> {
    const passwordHash = await hash(password, 6)
    const emailAlreadyExists = await this.oRGSRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new ORGAlreadyExistsError()
    }

    const org = await this.oRGSRepository.create({
      name,
      email,
      password: passwordHash,
      whatsapp,
      address,
    })

    return { org }
  }
}
