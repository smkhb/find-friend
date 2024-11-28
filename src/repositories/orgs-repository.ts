import { ORG, Prisma } from '@prisma/client'

export interface ORGSRepository {
  create(data: Prisma.ORGCreateInput): Promise<ORG>
  findByEmail(email: string): Promise<ORG | null>
  findByID(id: string): Promise<ORG | null>
}
