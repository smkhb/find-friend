import { ORG, Prisma } from '@prisma/client'

export interface ORGSRepository {
  create(data: Prisma.ORGCreateInput): Promise<ORG>
}
