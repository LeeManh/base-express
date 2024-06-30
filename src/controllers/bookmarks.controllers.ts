import { Response } from 'express'
import { HttpStatus } from '~/constants/httpStatus'
import { BookmarkTweetReqBody, RequestData, TokenPayload } from '~/constants/interfaces'
import { BOOKMARK_MESSAGES } from '~/constants/message'
import bookmarkService from '~/services/bookmarks.services'

export const bookmarkTweetController = async (req: RequestData<any, BookmarkTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const result = await bookmarkService.bookmarkTweet(user_id, req.body.tweet_id)

  return res.status(HttpStatus.CREATED).json({
    message: BOOKMARK_MESSAGES.BOOKMARK_SUCCESSFULLY,
    result
  })
}
