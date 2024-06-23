import { checkSchema } from 'express-validator'
import { USERS_MESSAGES } from '~/constants/message'
import userServices from '~/services/user.services'
import { validate } from '~/utils/validate'

export const forgotPasswordValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        custom: {
          options: async (value, { req }) => {
            const user = await userServices.findByEmail(value)

            if (!user) {
              throw new Error(USERS_MESSAGES.EMAIL_NOT_FOUND)
            }

            req.user = user

            return true
          }
        }
      }
    },
    ['body']
  )
)
