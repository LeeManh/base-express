import { Router } from 'express'
import { likeTweetController, unlikeTweetController } from '~/controllers/likes.controllers'
import { accessTokenValidator } from '~/middlewares/auth/accessTokenValidator'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'
import { verifiedUserValidator } from '~/middlewares/users/verifiedUserValidator'

const likesRouter = Router()

likesRouter.post('', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(likeTweetController))

likesRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(unlikeTweetController)
)

export default likesRouter
