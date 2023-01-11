export class ServerError extends Error {
  constructor() {
    super(
      'Um erro inesperado ocorreu. tente novamente dentro de alguns minutos.'
    )
    this.name = 'InvalidParamError'
  }
}
