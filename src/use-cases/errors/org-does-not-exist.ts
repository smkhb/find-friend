export class ORGADoesNotExistsError extends Error {
  constructor() {
    super('ORG does not exist')
    this.name = 'ORGDoesNotExistsError'
  }
}
