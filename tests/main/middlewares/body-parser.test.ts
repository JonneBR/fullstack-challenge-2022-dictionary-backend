import { setupApp } from '@/main/config/app'
import type { Express } from 'express'
import request from 'supertest'

let app: Express

beforeAll(async () => {
  app = await setupApp()
})

test('Should parse body as json', async () => {
  app.post('/test-body-parser', (req, res) => {
    res.send(req.body)
  })
  await request(app)
    .post('/test-body-parser')
    .send({ name: 'Yochanan' })
    .expect({ name: 'Yochanan' })
})
