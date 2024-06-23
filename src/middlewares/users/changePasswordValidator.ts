import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validate'
import { passwordValidator, confirmPasswordValidator } from '../commom-validator'
import { TokenPayload } from '~/constants/interfaces'
import userServices from '~/services/user.services'
import { comparePassword } from '~/utils/password'
import { ErrorWithStatus } from '~/models/Error'
import { HttpStatus } from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'

export const changePasswordValidator = validate(
  checkSchema({
    old_password: {
      ...passwordValidator,
      custom: {
        options: async (value, { req }) => {
          const { user_id } = req.decoded_authorization as TokenPayload
          const user = await userServices.findById(user_id)

          const isPasswordMatch = await comparePassword(value, user.password)

          if (!isPasswordMatch) {
            throw new ErrorWithStatus({
              message: USERS_MESSAGES.OLD_PASSWORD_IS_INCORRECT,
              status: HttpStatus.UNAUTHORIZED
            })
          }

          return true
        }
      }
    },
    password: {
      ...passwordValidator
    },
    confirm_password: {
      ...confirmPasswordValidator
    }
  })
)
