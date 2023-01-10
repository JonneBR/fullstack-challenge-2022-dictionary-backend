import request from 'supertest'
import { setupApp } from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import type { Express } from 'express'

let app: Express

beforeAll(async () => {
  app = await setupApp()
  await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  const accountCollection = MongoHelper.getCollection('accounts')
  await accountCollection.deleteMany({})
})

test('Should return an account on success', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      name: 'Yochanan',
      email: 'yochanan@email.com',
      password: 'yochanan123',
      passwordConfirmation: 'yochanan123'
    })
    .expect(200)
})
