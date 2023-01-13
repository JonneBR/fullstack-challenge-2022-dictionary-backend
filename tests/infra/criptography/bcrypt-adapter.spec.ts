import bcrypt from 'bcrypt'
import { Encrypter } from '@/data/protocols'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise((resolve) => {
      resolve('hashed_value')
    })
  }
}))

interface SutTypes {
  salt: number
  sut: Encrypter
}

const makeSut = (): SutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return {
    salt,
    sut
  }
}

test('Should call bcrypt with correct values', async () => {
  const { salt, sut } = makeSut()
  const hashSpy = jest.spyOn(bcrypt, 'hash')
  await sut.encrypt('any_value')
  expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
})

test('Should return a hash on success', async () => {
  const { sut } = makeSut()
  const hash = await sut.encrypt('hashed_value')
  expect(hash).toBe('hashed_value')
})

test('Should throw if Bcrypt throws', async () => {
  const { sut } = makeSut()
  jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
    throw new Error()
  })
  const promise = sut.encrypt('hashed_value')
  await expect(promise).rejects.toThrow()
})
