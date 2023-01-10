import request from 'supertest'
import app from '@/main/config/app'

test('Should return an account on success', async () => {
  await request(app)
    .post('/signup')
    .send({
      name: 'Yochanan',
      email: 'yochanan@email.com',
      password: 'yochanan123',
      passwordConfirmation: 'yochanan123'
    })
    .expect(404)
})
