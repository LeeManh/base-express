import { Router } from 'express'
import { createTweetController, getTweetController } from '~/controllers/tweets.controllers'
import { accessTokenValidator } from '~/middlewares/auth/accessTokenValidator'
import { isUserLoggedInValidator } from '~/middlewares/auth/isUserLoggedInValidator'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'
import { createTweetValidator } from '~/middlewares/tweets/createTweetValidator'
import { tweetIdValidator } from '~/middlewares/tweets/tweetIdValidator'
import { verifiedUserValidator } from '~/middlewares/users/verifiedUserValidator'

const tweetsRouter = Router()

tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapRequestHandler(createTweetController)
)

tweetsRouter.get(
  '/:tweet_id',
  tweetIdValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  wrapRequestHandler(getTweetController)
)

export default tweetsRouter
