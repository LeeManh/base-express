import { Response } from 'express'
import { LikeTweetReqBody, RequestData, TokenPayload } from '~/constants/interfaces'
import { LIKE_MESSAGES } from '~/constants/message'
import likeService from '~/services/likes.services'

export const likeTweetController = async (req: RequestData<any, LikeTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const result = await likeService.likeTweet(user_id, req.body.tweet_id)

  return res.json({
    message: LIKE_MESSAGES.LIKE_SUCCESSFULLY,
    result
  })
}

export const unlikeTweetController = async (req: RequestData<any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  await likeService.unlikeTweet(user_id, req.params.tweet_id)

  return res.json({
    message: LIKE_MESSAGES.UNLIKE_SUCCESSFULLY
  })
}
