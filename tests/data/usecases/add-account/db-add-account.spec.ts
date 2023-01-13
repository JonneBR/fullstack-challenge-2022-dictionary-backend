import { AddAccountRepository, Encrypter } from '@/data/protocols'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await new Promise((resolve) => {
        resolve('encrypted_password')
      })
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    params: AddAccountRepository.Params = {} as AddAccountRepository.Params
    result = true
    async add(
      account: AddAccountRepository.Params
    ): Promise<AddAccountRepository.Result> {
      this.params = account
      return this.result
    }
  }
  return new AddAccountRepositoryStub()
}
interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

const makeFakeAccountData = (): AddAccountRepository.Params => ({
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

test('Should call Encrypter with correct password', async () => {
  const { sut, encrypterStub } = makeSut()
  const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
  await sut.add(makeFakeAccountData())
  expect(encryptSpy).toHaveBeenCalledWith('valid_password')
})

test('Should throw if Encrypter throws', async () => {
  const { sut, encrypterStub } = makeSut()
  jest.spyOn(encrypterStub, 'encrypt').mockReturnValue(
    new Promise((resolve, reject) => {
      reject(new Error())
    })
  )
  const promise = sut.add(makeFakeAccountData())
  await expect(promise).rejects.toThrow()
})

test('Should call AddAccountRepository with correct values', async () => {
  const { sut, addAccountRepositoryStub } = makeSut()
  const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
  await sut.add(makeFakeAccountData())
  expect(addSpy).toHaveBeenCalledWith({
    name: 'valid_name',
    email: 'valid_email@email.com',
    password: 'encrypted_password'
  })
})

test('Should throw if AddAccountRepository throws', async () => {
  const { sut, addAccountRepositoryStub } = makeSut()
  jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValue(
    new Promise((resolve, reject) => {
      reject(new Error())
    })
  )
  const promise = sut.add(makeFakeAccountData())
  await expect(promise).rejects.toThrow()
})

test('Should return an account on success', async () => {
  const { sut } = makeSut()
  const isValid = await sut.add(makeFakeAccountData())
  expect(isValid).toBe(true)
})
