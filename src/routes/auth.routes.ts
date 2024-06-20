import { Router } from 'express'
import { loginController, registerController } from '~/controllers/auth.controllers'
import { loginValidator } from '~/middlewares/auth/login-validator.middleware'
import { registerValidator } from '~/middlewares/auth/register-validator.middleware'
import { wrapRequestHandler } from '~/middlewares/wrapRequestHandler'

const authRouter = Router()

authRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default authRouter
