import { setupApp } from '../config/app'
import type { Express } from 'express'
import request from 'supertest'

let app: Express

beforeAll(async () => {
  app = await setupApp()
})

test('Should enable CORS', async () => {
  app.post('/test-cors', (req, res) => {
    res.send(req.body)
  })
  await request(app)
    .get('/test-cors')
    .expect('access-control-allow-origin', '*')
    .expect('access-control-allow-methods', '*')
    .expect('access-control-allow-headers', '*')
})
