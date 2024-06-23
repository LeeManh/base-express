import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { HttpStatus } from '~/constants/httpStatus'
import { TokenPayload } from '~/constants/interfaces'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import databaseService from '~/services/database.service'
import { validate } from '~/utils/validate'

export const unFollowValidator = validate(
  checkSchema(
    {
      followed_user_id: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.USER_ID_IS_REQUIRED
        },
        isMongoId: {
          errorMessage: USERS_MESSAGES.INVALID_USER_ID
        },
        custom: {
          options: async (value, { req }) => {
            const { user_id: my_user_id } = req.decoded_authorization as TokenPayload

            if (my_user_id === value) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.CANNOT_UN_FOLLOW_YOURSELF,
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
    },
    ['params']
  )
)
