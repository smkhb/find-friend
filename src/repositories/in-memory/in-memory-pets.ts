import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findByID(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }
    return pet
  }

  async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: 'pet-1',
      name: data.name,
      age: data.age,
      city: data.city,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)
    return pet
  }
}
