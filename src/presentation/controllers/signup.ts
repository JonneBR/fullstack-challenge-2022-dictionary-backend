import { Controller, EmailValidator, HttpResponse, HttRequest } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers'

export class SignUpController implements Controller {
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  private readonly emailValidator: EmailValidator

  handle (httpRequest: HttRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (httpRequest.body.passwordConfirmation !== httpRequest.body.password) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) return badRequest(new InvalidParamError('email'))
      return badRequest(new MissingParamError('default'))
    } catch (error) {
      return serverError()
    }
  }
}
