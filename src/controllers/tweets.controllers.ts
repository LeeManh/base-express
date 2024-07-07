import { Response } from 'express'
import { RequestData, TokenPayload, TweetRequestBody } from '~/constants/interfaces'
import tweetsService from '~/services/tweets.services'

export async function createTweetController(req: RequestData<any, TweetRequestBody>, res: Response) {
  const { user_id } = req.decoded_authorization as TokenPayload

  const result = await tweetsService.createTweet(user_id, req.body)

  return res.json({
    message: 'Create Tweet Successfully',
    result
  })
}

export const getTweetController = async (req: RequestData<any>, res: Response) => {
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  const tweet = {
    ...req.tweet,
    guest_views: result.guest_views,
    user_views: result.user_views
  }

  return res.json({
    message: 'Get Tweet Successfully',
    result: tweet
  })
}
