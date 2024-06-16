import { Router } from 'express'
import { registerController } from '~/controllers/auth.controllers'

const authRouter = Router()

authRouter.post('/register', registerController)

export default authRouter
