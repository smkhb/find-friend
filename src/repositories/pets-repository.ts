import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByID(id: string): Promise<Pet | null>
  findByCity(city: string): Promise<Pet[]>
  filterByAttributes(attributes: Prisma.PetWhereInput): Promise<Pet[]>
}
