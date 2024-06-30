import { Router } from 'express'
import { createTweetController } from '~/controllers/tweets.controllers'
import { accessTokenValidator } from '~/middlewares/auth/accessTokenValidator'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'
import { createTweetValidator } from '~/middlewares/tweets/createTweetValidator'
import { verifiedUserValidator } from '~/middlewares/users/verifiedUserValidator'

const tweetsRouter = Router()

tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapRequestHandler(createTweetController)
)

export default tweetsRouter
