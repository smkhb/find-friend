export class ORGAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already registered')
    this.name = 'ORGAlreadyExistsError'
  }
}
