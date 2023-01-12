import { LogErrorRepository } from '@/data/protocols/log-error-repository'
import { ok, serverError } from '@/presentation/helpers'
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
      return await new Promise((resolve) => {
        resolve(ok(true))
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

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeServerError = (): HttpResponse => {
  const fakeErrorMock = new Error()
  fakeErrorMock.stack = 'any_stack'
  return serverError(fakeErrorMock)
}

test('Should call Controller with correct values', async () => {
  const { controllerStub, sut } = makeSut()
  const handleSpy = jest.spyOn(controllerStub, 'handle')
  await sut.handle(makeFakeRequest())
  expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
})

test('Should call Controller and return correct', async () => {
  const { sut } = makeSut()
  const httpResponse = await sut.handle(makeFakeRequest())
  expect(httpResponse).toEqual(ok(true))
})

test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
  const { controllerStub, sut, logErrorRepositoryStub } = makeSut()
  const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
  jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
    new Promise((resolve) => {
      resolve(makeFakeServerError())
    })
  )
  await sut.handle(makeFakeRequest())
  expect(logSpy).toHaveBeenCalledWith('any_stack')
})
