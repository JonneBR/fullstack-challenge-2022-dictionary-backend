import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  controllerStub: Controller
  sut: LogControllerDecorator
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: 'any_body'
      }
      return await new Promise((resolve) => {
        resolve(httpResponse)
      })
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    controllerStub,
    sut
  }
}

test('Should call Controller with correct values', async () => {
  const { controllerStub, sut } = makeSut()
  const handleSpy = jest.spyOn(controllerStub, 'handle')
  const httpRequest: HttpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  await sut.handle(httpRequest)
  expect(handleSpy).toHaveBeenCalledWith(httpRequest)
})

test('Should call Controller and return correct', async () => {
  const { sut } = makeSut()
  const httpRequest: HttpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = await sut.handle(httpRequest)
  expect(httpResponse).toEqual({
    statusCode: 200,
    body: 'any_body'
  })
})
