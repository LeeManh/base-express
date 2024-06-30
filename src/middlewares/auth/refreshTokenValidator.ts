import { checkSchema } from 'express-validator'
import { HttpStatus } from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validate'

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
                status: HttpStatus.UNAUTHORIZED
              })
            }

            const decoded_refresh_token = await verifyToken({
              token: value,
              secretOrPublicKey: process.env.REFRESH_TOKEN_SECRET
            })

            req.decoded_refresh_token = decoded_refresh_token

            return true
          }
        }
      }
    },
    ['body']
  )
)
