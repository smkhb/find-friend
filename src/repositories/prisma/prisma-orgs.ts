import { ORG, Prisma } from '@prisma/client'
import { ORGSRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaORGSRepository implements ORGSRepository {
  async findByEmail(email: string): Promise<ORG | null> {
    const org = await prisma.oRG.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: Prisma.ORGCreateInput): Promise<ORG> {
    return await prisma.oRG.create({ data })
  }
}