import { Router } from 'express'
import { loginValidator } from '~/middlewares/auth/login-validator.middleware'

const usersRoutes = Router()

usersRoutes.get('/', loginValidator, (req, res) => {
  res.send('Hello World!')
})

export default usersRoutes
