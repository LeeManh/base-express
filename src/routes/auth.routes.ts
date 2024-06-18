import { Router } from 'express'
import { registerController } from '~/controllers/auth.controllers'
import { registerValidator } from '~/middlewares/auth/register-validator.middleware'

const authRouter = Router()

authRouter.post('/register', registerValidator, registerController)

export default authRouter
