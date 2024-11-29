import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByID(id: string): Promise<Pet | null>
  findManyByCity(city: string, page: number): Promise<Pet[]>
  filterByAttributes(attributes: Prisma.PetWhereInput): Promise<Pet[]>
}
