import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { HttpStatus } from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Error'
import userServices from '~/services/user.services'
import { validate } from '~/utils/validate'

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: true,
        isString: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          }
        },
        trim: true
      },
      email: {
        notEmpty: true,
        isEmail: true,
        trim: true,
        custom: {
          options: async (value) => {
            const user = await userServices.findByEmail(value)

            if (user) {
              throw new ErrorWithStatus({ message: 'Email already exists', status: HttpStatus.CONFLICT })
            }

            return true
          }
        }
      },
      password: {
        notEmpty: true,
        isString: true,
        isLength: {
          options: {
            min: 6,
            max: 50
          }
        }
      },
      confirm_password: {
        notEmpty: true,
        isString: true,
        isLength: {
          options: {
            min: 6,
            max: 50
          }
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password confirmation does not match password')
            }
            return true
          }
        }
      },
      date_of_birth: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          }
        }
      }
    },
    ['body']
  )
)
