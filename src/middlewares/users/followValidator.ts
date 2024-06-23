import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { HttpStatus } from '~/constants/httpStatus'
import { TokenPayload } from '~/constants/interfaces'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import databaseService from '~/services/database.service'
import { validate } from '~/utils/validate'

export const followValidator = validate(
  checkSchema({
    followed_user_id: {
      custom: {
        options: async (value, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              message: USERS_MESSAGES.FOLLOW_USER_ID_IS_REQUIRED,
              status: HttpStatus.BAD_REQUEST
            })
          }

          if (!ObjectId.isValid(value)) {
            throw new ErrorWithStatus({
              message: USERS_MESSAGES.INVALID_USER_ID,
              status: HttpStatus.BAD_REQUEST
            })
          }

          const { user_id: my_user_id } = req.decoded_authorization as TokenPayload
          if (my_user_id === value) {
            throw new ErrorWithStatus({
              message: USERS_MESSAGES.CANNOT_FOLLOW_YOURSELF,
              status: HttpStatus.BAD_REQUEST
            })
          }

          const followed_user = await databaseService.users.findOne({
            _id: new ObjectId(value)
          })

          if (!followed_user) {
            throw new ErrorWithStatus({
              message: USERS_MESSAGES.USER_NOT_FOUND,
              status: HttpStatus.NOT_FOUND
            })
          }

          return true
        }
      }
    }
  })
)
