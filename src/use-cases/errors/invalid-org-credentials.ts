export class InvalidORGCredentialsError extends Error {
  constructor() {
    super('Invalid ORG credentials')
    this.name = 'InvalidORGCredentialsError'
  }
}
