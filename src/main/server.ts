import express, { Express } from 'express'

const app: Express = express()

app.listen(5050, () => {
  console.log('Server running at http://localhost:5050')
})
