import { HttpResponse, HttRequest } from '../protocols'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class SignUpController {
  handle (httpRequest: HttRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return badRequest(new MissingParamError('default'))
  }
}
