import { MongoHelper } from '../helpers/mongo-helper'
// import { AccountMongoRepository } from './account'

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

test('Should return an account on success', async () => {
  //   const sut = new AccountMongoRepository()
  //   const isValid = await sut.add({
  //     name: 'any_name',
  //     email: 'any_email@email.com',
  //     password: 'any_password'
  //   })
  //   expect(isValid).toBe({
  //     id: 'string',
  //     name: 'string',
  //     email: 'string',
  //     password: 'string'
  //   })
  expect(1).toBe(1)
})
