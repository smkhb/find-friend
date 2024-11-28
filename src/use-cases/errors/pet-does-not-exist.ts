export class PetDoesNotExistsError extends Error {
  constructor() {
    super('Pet does not exist')
    this.name = 'PetDoesNotExistsError'
  }
}
