import { Prisma, ORG, Role } from '@prisma/client'
import { ORGSRepository } from '../orgs-repository'

export class InMemoryORGSRepository implements ORGSRepository {
  public items: ORG[] = []

  async findByEmail(email: string): Promise<ORG | null> {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }
    return org
  }

  async create(data: Prisma.ORGCreateInput): Promise<ORG> {
    const org = {
      id: 'org-1',
      name: data.name,
      email: data.email,
      password: data.password,
      whatsapp: data.whatsapp,
      address: data.address,
      role: 'ADMIN' as Role,
      created_at: new Date(),
    }

    this.items.push(org)
    return org
  }

  async findByID(id: string): Promise<ORG | null> {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }
    return org
  }
}
