import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validate'
import { confirmPasswordValidator, passwordValidator } from '../commom-validator'
import { verifyToken } from '~/utils/jwt'
import { TokenPayload } from '~/constants/interfaces'
import userServices from '~/services/user.services'
import { ErrorWithStatus } from '~/models/Error'
import { USERS_MESSAGES } from '~/constants/message'
import { HttpStatus } from '~/constants/httpStatus'

export const resetPasswordValidator = validate(
  checkSchema({
    password: passwordValidator,
    confirm_password: confirmPasswordValidator,
    forgot_password_token: {
      notEmpty: true,
      isString: true,
      custom: {
        options: async (value, { req }) => {
          const decoded_forgot_password_token = await verifyToken({
            token: value,
            secretOrPublicKey: process.env.FORGOT_PASSWORD_SECRET
          })

          const { user_id } = decoded_forgot_password_token as TokenPayload
          const user = userServices.findById(user_id)

          if (!user) {
            throw new ErrorWithStatus({
              message: USERS_MESSAGES.USER_NOT_FOUND,
              status: HttpStatus.UNAUTHORIZED
            })
          }

          req.decoded_forgot_password_token = decoded_forgot_password_token

          return true
        }
      }
    }
  })
)
