import { Router } from 'express'
import { registerController } from '~/controllers/auth.controllers'
import { registerValidator } from '~/middlewares/auth/register-validator.middleware'
import { wrapRequestHandler } from '~/middlewares/wrapRequestHandler'

const authRouter = Router()

authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default authRouter
