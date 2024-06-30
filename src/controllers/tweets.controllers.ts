import { Response } from 'express'
import { RequestData, TweetRequestBody } from '~/constants/interfaces'

export async function createTweetController(req: RequestData<any, TweetRequestBody>, res: Response) {
  return res.json({ message: 'Create tweet successfully' })
}
