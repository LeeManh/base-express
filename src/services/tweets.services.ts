import { ObjectId } from 'mongodb'
import { TweetRequestBody } from '~/constants/interfaces'
import databaseService from './database.service'
import Tweet from '~/models/schemas/Tweet.schema'
import hashtagService from './hashtag.services'

class TweetsService {
  async createTweet(user_id: string, body: TweetRequestBody) {
    const hashtags = await hashtagService.checkAndCreateHashtags(body.hashtags)

    const result = await databaseService.tweets.insertOne(
      new Tweet({
        audience: body.audience,
        content: body.content,
        hashtags,
        mentions: body.mentions,
        medias: body.medias,
        parent_id: body.parent_id,
        type: body.type,
        user_id: new ObjectId(user_id)
      })
    )

    const tweet = await databaseService.tweets.findOne({ _id: result.insertedId })
    return tweet
  }

  async isAuthor({ tweet_id, user_id }: { user_id: string; tweet_id: string }) {
    const tweet = await databaseService.tweets.findOne({ _id: new ObjectId(tweet_id) })
    return tweet?.user_id.toString() === user_id
  }
}

const tweetsService = new TweetsService()

export default tweetsService
