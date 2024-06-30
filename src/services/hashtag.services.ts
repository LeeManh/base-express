import { ObjectId, WithId } from 'mongodb'
import databaseService from './database.service'
import Hashtag from '~/models/schemas/Hashtag.schema'

class HashtagServices {
  async checkAndCreateHashtags(hashtags: string[]) {
    const hashtagDocuments = await Promise.all(
      hashtags.map((hashtag) => {
        // Tìm hashtag trong database, nếu có thì lấy, không thì tạo mới
        return databaseService.hashtags.findOneAndUpdate(
          { name: hashtag },
          {
            $setOnInsert: new Hashtag({ name: hashtag })
          },
          {
            upsert: true,
            returnDocument: 'after'
          }
        )
      })
    )
    return hashtagDocuments.map((hashtag) => ((hashtag as any).value as WithId<Hashtag>)._id)
  }
}

const hashtagService = new HashtagServices()

export default hashtagService
