import { LogErrorRepository } from '@/data/protocols/log-error-repository'
import { serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from './log'

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {
      await new Promise((resolve) => {
        resolve('void')
      })
    }
  }
  return new LogErrorRepositoryStub()
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: { name: 'any_name' }
      }
      return await new Promise((resolve) => {
        resolve(httpResponse)
      })
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  controllerStub: Controller
  sut: LogControllerDecorator
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    controllerStub,
    sut,
    logErrorRepositoryStub
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
    body: { name: 'any_name' }
  })
})

test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
  const { controllerStub, sut, logErrorRepositoryStub } = makeSut()
  const fakeErrorMock = new Error()
  fakeErrorMock.stack = 'any_stack'
  const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
  jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
    new Promise((resolve) => {
      resolve(serverError(fakeErrorMock))
    })
  )
  const httpRequest: HttpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  await sut.handle(httpRequest)
  expect(logSpy).toHaveBeenCalledWith('any_stack')
})
