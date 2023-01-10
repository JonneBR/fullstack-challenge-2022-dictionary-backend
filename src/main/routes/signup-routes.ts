import { Router } from 'express'

export default (router: Router): void => {
  router.post('/auth/signup', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
