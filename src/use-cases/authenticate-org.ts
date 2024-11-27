import { ORGSRepository } from '@/repositories/orgs-repository'
import { ORG } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidORGCredentialsError } from './errors/invalid-org-credentials'

interface authenticateRequest {
  email: string
  password: string
}

interface authenticateResponse {
  org: ORG
}

export class AuthenticateORGUseCase {
  constructor(private oRGSRepository: ORGSRepository) {}

  async execute({
    email,
    password,
  }: authenticateRequest): Promise<authenticateResponse> {
    const org = await this.oRGSRepository.findByEmail(email)

    if (!org) {
      throw new InvalidORGCredentialsError()
    }

    const doesPasswordMatch = await compare(password, org.password)

    if (!doesPasswordMatch) {
      throw new InvalidORGCredentialsError()
    }

    return { org }
  }
}
