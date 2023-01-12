import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { AddAccount, EmailValidator, HttpRequest } from './signup-protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    params: AddAccount.Params = {} as AddAccount.Params
    result = true

    async add(account: AddAccount.Params): Promise<AddAccount.Result> {
      this.params = account
      return this.result
    }
  }
  return new AddAccountStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

test('Should return 400 if no name is provided', async () => {
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = await sut.handle(httpRequest)
  expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
})

test('Should return 400 if no email is provided', async () => {
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = await sut.handle(httpRequest)
  expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
})

test('Should return 400 if no password is provided', async () => {
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = await sut.handle(httpRequest)
  expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
})

test('Should return 400 if no passwordConfirmation is provided', async () => {
  const { sut } = makeSut()

  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
  }
  const httpResponse = await sut.handle(httpRequest)
  expect(httpResponse).toEqual(
    badRequest(new MissingParamError('passwordConfirmation'))
  )
})

test('Should return 400 if password and passwordConfirmation are different', async () => {
  const { sut } = makeSut()

  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'different_password'
    }
  }
  const httpResponse = await sut.handle(httpRequest)
  expect(httpResponse).toEqual(
    badRequest(new InvalidParamError('passwordConfirmation'))
  )
})

test('Should return 400 if an invalid email is provided', async () => {
  const { sut, emailValidatorStub } = makeSut()
  jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
  const httpResponse = await sut.handle(makeFakeRequest())
  expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
})

test('Should call EmailValidator with correct email', async () => {
  const { sut, emailValidatorStub } = makeSut()
  const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
  const httpRequest = makeFakeRequest()
  await sut.handle(httpRequest)
  expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
})

test('Should return 500 if EmailValidator throws', async () => {
  const { sut, emailValidatorStub } = makeSut()
  jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
    throw new Error()
  })
  const httpResponse = await sut.handle(makeFakeRequest())
  expect(httpResponse).toEqual(
    serverError(new ServerError('Server responded with an error'))
  )
})

test('Should return 500 if AddAccount throws', async () => {
  const { sut, addAccountStub } = makeSut()
  jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
    return await new Promise((resolve, reject) => {
      reject(new Error())
    })
  })
  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = await sut.handle(httpRequest)
  expect(httpResponse).toEqual(
    serverError(new ServerError('Server responded with an error'))
  )
})

test('Should call AddAccount with correct values', async () => {
  const { sut, addAccountStub } = makeSut()
  const addSpy = jest.spyOn(addAccountStub, 'add')
  await sut.handle(makeFakeRequest())
  expect(addSpy).toHaveBeenCalledWith({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
  })
})

test('Should return 200 if valid data is provided', async () => {
  const { sut } = makeSut()
  const httpReponse = await sut.handle(makeFakeRequest())
  expect(httpReponse).toEqual(ok(true))
})
