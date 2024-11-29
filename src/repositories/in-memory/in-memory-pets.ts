import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

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

  async findByID(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }
    return pet
  }

  findByCity(city: string): Promise<Pet[]> {
    const pets = this.items.filter((item) => item.city === city)

    return Promise.resolve(pets)
  }

  filterByAttributes(attributes: Prisma.PetWhereInput): Promise<Pet[]> {
    const { city, age } = attributes

    if (city && age) {
      const pets = this.items.filter(
        (item) => item.city === city && item.age === age,
      )
      return Promise.resolve(pets)
    }
    const pets = this.items.filter((item) => item.city === city)

    return Promise.resolve(pets)
  }
}
