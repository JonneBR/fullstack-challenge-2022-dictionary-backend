import { Collection } from 'mongodb'
import { MongoHelper } from '../mongo-helper'
import { LogMongoRepository } from './log'

let errorCollection: Collection

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  errorCollection = MongoHelper.getCollection('errors')
  await errorCollection.deleteMany({})
})

test('Should create an error log on success', async () => {
  const sut = makeSut()
  await sut.log('any_error')
  const count = await errorCollection.countDocuments()
  expect(count).toBe(1)
})
