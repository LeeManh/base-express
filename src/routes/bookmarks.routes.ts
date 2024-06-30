import { Router } from 'express'
import { bookmarkTweetController, unBookmarkTweetController } from '~/controllers/bookmarks.controllers'
import { accessTokenValidator } from '~/middlewares/auth/accessTokenValidator'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'
import { tweetIdValidator } from '~/middlewares/tweets/tweetIdValidator'
import { verifiedUserValidator } from '~/middlewares/users/verifiedUserValidator'

const bookmarksRouter = Router()

bookmarksRouter.post(
  '',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(bookmarkTweetController)
)

bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unBookmarkTweetController)
)

export default bookmarksRouter
