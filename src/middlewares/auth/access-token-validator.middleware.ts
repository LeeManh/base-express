import { checkSchema } from 'express-validator'
import { HttpStatus } from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validate'

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
                status: HttpStatus.UNAUTHORIZED
              })
            }

            const access_token = value.split(' ')?.[1]

            if (!access_token) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
                status: HttpStatus.UNAUTHORIZED
              })
            }

            const decoded_authorization = await verifyToken({
              token: access_token
            })

            req.decoded_authorization = decoded_authorization

            return true
          }
        }
      }
    },
    ['headers']
  )
)
