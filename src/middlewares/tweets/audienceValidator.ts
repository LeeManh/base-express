import { NextFunction, Request, Response } from 'express'
import { TweetAudience, UserVerifyStatus } from '~/constants/enum'
import { HttpStatus } from '~/constants/httpStatus'
import { TWEETS_MESSAGES, USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import Tweet from '~/models/schemas/Tweet.schema'
import userServices from '~/services/user.services'
import { wrapRequestHandler } from '../errors/wrapRequestHandler'

export const audienceValidator = wrapRequestHandler(async (req: Request, res: Response, next: NextFunction) => {
  const tweet = req.tweet as Tweet

  // public tweets can be accessed by everyone
  if (tweet.audience === TweetAudience.Everyone) {
    next()
  }

  // check if the user is logged in
  const isUserLogin = req.decoded_authorization
  if (!isUserLogin) {
    throw new ErrorWithStatus({
      status: HttpStatus.UNAUTHORIZED,
      message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
    })
  }

  // check if the author is banned
  const author = await userServices.findById(tweet.user_id.toString())
  if (author.verify === UserVerifyStatus.Banned) {
    throw new ErrorWithStatus({
      status: HttpStatus.FORBIDDEN,
      message: USERS_MESSAGES.USER_IS_BANNED
    })
  }

  // check if the user is in the tweet circle
  const isUserInTweetCircle =
    tweet.audience === TweetAudience.TwitterCircle &&
    author.twitter_circle.some((id) => id.equals(req.decoded_authorization?.user_id))
  const isAuthor = author._id.equals(req.decoded_authorization?.user_id)
  if (!isUserInTweetCircle && !isAuthor) {
    throw new ErrorWithStatus({
      status: HttpStatus.FORBIDDEN,
      message: TWEETS_MESSAGES.TWEET_IS_NOT_PUBLIC
    })
  }

  next()
})
