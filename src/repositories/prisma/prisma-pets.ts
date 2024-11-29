import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return await prisma.pet.create({ data })
  }

  findByID(id: string): Promise<Pet | null> {
    const pet = prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  findManyByCity(city: string, page: number): Promise<Pet[]> {
    const pet = prisma.pet.findMany({
      where: {
        city,
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    return pet
  }

  filterByAttributes(attributes: Prisma.PetWhereInput): Promise<Pet[]> {
    const { city, age } = attributes
    const pets = prisma.pet.findMany({
      where: {
        city,
        age,
      },
    })

    return pets
  }
}
