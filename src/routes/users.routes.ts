import { Router } from 'express'
import { getMe, updateMe } from '~/controllers/users.controller'
import { accessTokenValidator } from '~/middlewares/auth/access-token-validator.middleware'
import { updateMeValidator } from '~/middlewares/auth/update-me-validator.middleware'
import { verifiedUserValidator } from '~/middlewares/auth/verified-user-validator.middleware'
import { wrapRequestHandler } from '~/middlewares/wrapRequestHandler'

const usersRouter = Router()

usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMe))
usersRouter.patch('/me', accessTokenValidator, verifiedUserValidator, updateMeValidator, wrapRequestHandler(updateMe))

export default usersRouter
