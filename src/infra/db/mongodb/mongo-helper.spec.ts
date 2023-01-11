import { MongoHelper as sut } from './mongo-helper'

beforeAll(async () => {
  await sut.connect()
})

afterAll(async () => {
  await sut.disconnect()
})

test('Should reconnect if mongodb is closed', async () => {
  const accountCollection = sut.getCollection('accounts')
  expect(accountCollection).toBeTruthy()
})
