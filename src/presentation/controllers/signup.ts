import { HttpResponse, HttRequest } from '../protocols'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class SignUpController {
  handle (httpRequest: HttRequest): HttpResponse {
    if (!httpRequest.body.name) return badRequest(new MissingParamError('name'))
    if (!httpRequest.body.email) return badRequest(new MissingParamError('email'))
    return badRequest(new MissingParamError('default'))
  }
}
