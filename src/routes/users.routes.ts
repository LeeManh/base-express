import { Router } from 'express'
import { changePassword, followUser, getMe, getProfile, unFollowUser, updateMe } from '~/controllers/users.controller'
import { accessTokenValidator } from '~/middlewares/auth/accessTokenValidator'
import { verifiedUserValidator } from '~/middlewares/users/verifiedUserValidator'
import { updateMeValidator } from '~/middlewares/users/updateMeValidator'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'
import { IBodyFollowUser, IBodyUpdateUser } from '~/constants/interfaces'
import { filterMiddleware } from '~/middlewares/filterMiddleware'
import { followValidator } from '~/middlewares/users/followValidator'
import { changePasswordValidator } from '~/middlewares/users/changePasswordValidator'
import { unFollowValidator } from '~/middlewares/users/unFollowValidator'

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
usersRouter.delete(
  '/unfollow/:followed_user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unFollowValidator,
  wrapRequestHandler(unFollowUser)
)
usersRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePassword)
)

export default usersRouter
