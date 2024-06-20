import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/auth.controllers'
import { accessTokenValidator } from '~/middlewares/auth/access-token-validator.middleware'
import { loginValidator } from '~/middlewares/auth/login-validator.middleware'
import { registerValidator } from '~/middlewares/auth/register-validator.middleware'
import { wrapRequestHandler } from '~/middlewares/wrapRequestHandler'

const authRouter = Router()

authRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
authRouter.post('/logout', accessTokenValidator, wrapRequestHandler(logoutController))

export default authRouter
