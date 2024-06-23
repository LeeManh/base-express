import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { ErrorWithStatus } from '~/models/Error'
import { USERS_MESSAGES } from '~/constants/message'
import { HttpStatus } from '~/constants/httpStatus'
import { IBodyUpdateUser } from '~/constants/interfaces'
import { projectionUser } from '~/constants/projections'

class UserServices {
  async findByEmail(email: string) {
    const user = await databaseService.users.findOne({ email })

    return user
  }

  async findById(user_id: string) {
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

    if (!user) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HttpStatus.NOT_FOUND
      })
    }

    return user
  }

  async getMe(user_id: string) {
    return await databaseService.users.findOne(
      { _id: new ObjectId(user_id) },
      {
        projection: projectionUser
      }
    )
  }

  async updateMe(user_id: string, data: IBodyUpdateUser) {
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: {
          ...(data as any)
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }

  async getProfile(username: string) {
    const user = await databaseService.users.findOne(
      {
        username
      },
      { projection: projectionUser }
    )

    if (!user) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HttpStatus.NOT_FOUND
      })
    }

    return user
  }

  async followUser(user_id: string, followed_user_id: string) {
    const follow = await databaseService.followers.findOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })

    if (follow) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_ALREADY_FOLLOWED,
        status: HttpStatus.BAD_REQUEST
      })
    }

    await databaseService.followers.insertOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id),
      created_at: new Date()
    })
  }
}

const userServices = new UserServices()
export default userServices
