import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from './log'

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

test('Should call controller handle internaly ', async () => {
  const controllerStub = new ControllerStub()
  const handleSpy = jest.spyOn(controllerStub, 'handle')
  const sut = new LogControllerDecorator(controllerStub)
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
