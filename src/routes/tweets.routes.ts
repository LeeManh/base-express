import { Router } from 'express'
import { createTweetController, getTweetChildrenController, getTweetController } from '~/controllers/tweets.controllers'
import { accessTokenValidator } from '~/middlewares/auth/accessTokenValidator'
import { isUserLoggedInValidator } from '~/middlewares/auth/isUserLoggedInValidator'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'
import { audienceValidator } from '~/middlewares/tweets/audienceValidator'
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
  audienceValidator,
  wrapRequestHandler(getTweetController)
)

tweetsRouter.get(
  '/:tweet_id/children',
  tweetIdValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetChildrenController)
)

export default tweetsRouter
