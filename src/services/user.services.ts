import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { ErrorWithStatus } from '~/models/Error'
import { USERS_MESSAGES } from '~/constants/message'
import { HttpStatus } from '~/constants/httpStatus'

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
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0,
          refresh_token: 0,
          created_at: 0,
          updated_at: 0
        }
      }
    )
  }
}

const userServices = new UserServices()
export default userServices
