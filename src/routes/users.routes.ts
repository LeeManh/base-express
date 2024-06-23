import { Router } from 'express'
import { getMe, getProfile, updateMe } from '~/controllers/users.controller'
import { accessTokenValidator } from '~/middlewares/auth/accessTokenValidator'
import { verifiedUserValidator } from '~/middlewares/auth/verifiedUserValidator'
import { updateMeValidator } from '~/middlewares/users/updateMeValidator'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'
import { IBodyUpdateUser } from '~/constants/interfaces'
import { filterMiddleware } from '~/middlewares/filterMiddleware'

const usersRouter = Router()

usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMe))
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  filterMiddleware<IBodyUpdateUser>([
    'name',
    'avatar',
    'bio',
    'cover_photo',
    'date_of_birth',
    'location',
    'username',
    'website'
  ]),
  updateMeValidator,
  wrapRequestHandler(updateMe)
)
usersRouter.get('/:username', wrapRequestHandler(getProfile))

export default usersRouter
