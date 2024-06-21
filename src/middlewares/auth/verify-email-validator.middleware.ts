import { checkSchema } from 'express-validator'
import { HttpStatus } from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validate'

export const verifyEmailValidator = validate(
  checkSchema(
    {
      email_verification_token: {
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.EMAIL_VERIFICATION_TOKEN_IS_REQUIRED,
                status: HttpStatus.UNAUTHORIZED
              })
            }

            const decoded_email_verification = await verifyToken({
              token: value,
              secretOrPublicKey: process.env.EMAIL_VERIFICATION_SECRET
            })

            req.decoded_email_verification = decoded_email_verification

            return true
          }
        }
      }
    },
    ['body']
  )
)
