import { Router } from 'express'
import { getMe } from '~/controllers/users.controller'
import { accessTokenValidator } from '~/middlewares/auth/access-token-validator.middleware'
import { wrapRequestHandler } from '~/middlewares/wrapRequestHandler'

const usersRouter = Router()

usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMe))

export default usersRouter
