export class ServerError extends Error {
  constructor(stack: string) {
    super(
      'Um erro inesperado ocorreu. tente novamente dentro de alguns minutos.'
    )
    this.name = 'InvalidParamError'
    this.stack = stack
  }
}
