import { ORGSRepository } from '@/repositories/orgs-repository'
import { ORG } from '@prisma/client'
import { hash } from 'bcryptjs'

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
