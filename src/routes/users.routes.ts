import { Router } from 'express'
import { followUser, getMe, getProfile, updateMe } from '~/controllers/users.controller'
import { accessTokenValidator } from '~/middlewares/auth/accessTokenValidator'
import { verifiedUserValidator } from '~/middlewares/users/verifiedUserValidator'
import { updateMeValidator } from '~/middlewares/users/updateMeValidator'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'
import { IBodyFollowUser, IBodyUpdateUser } from '~/constants/interfaces'
import { filterMiddleware } from '~/middlewares/filterMiddleware'
import { followValidator } from '~/middlewares/users/followValidator'

const usersRouter = Router()

usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMe))
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
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
  wrapRequestHandler(updateMe)
)
usersRouter.get('/:username', wrapRequestHandler(getProfile))
usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  filterMiddleware<IBodyFollowUser>(['followed_user_id']),
  wrapRequestHandler(followUser)
)

export default usersRouter
