export class PetsNotFoundError extends Error {
  constructor() {
    super('Pets not found')
    this.name = 'PetsNotFoundError'
  }
}
