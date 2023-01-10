import { setupApp } from '../config/app'
import type { Express } from 'express'
import request from 'supertest'

let app: Express

beforeAll(async () => {
  app = await setupApp()
})

test('Should return default content type as JSON', async () => {
  app.get('/test-content-type', (req, res) => {
    res.send('')
  })
  await request(app).get('/test-content-type').expect('content-type', /json/)
})

test('Should return default xml content type when forced', async () => {
  app.get('/test-content-type-xml', (req, res) => {
    res.type('xml')
    res.send('')
  })
  await request(app).get('/test-content-type-xml').expect('content-type', /xml/)
})
