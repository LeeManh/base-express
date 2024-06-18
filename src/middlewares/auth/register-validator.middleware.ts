import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
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
        trim: true
      },
      password: {
        notEmpty: true,
        isString: true,
        isLength: {
          options: {
            min: 6,
            max: 50
          }
        },
        custom: {
          options: async (value) => {
            const user = await userServices.findByEmail(value)

            if (!user) {
              throw new Error('Email already exists')
            }

            return true
          }
        }

        // isStrongPassword: {
        //   options: {
        //     minLength: 6,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1,
        //     minSymbols: 1
        //   },
        //   errorMessage:
        //     'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
        // }
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
        // isStrongPassword: {
        //   options: {
        //     minLength: 6,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1,
        //     minSymbols: 1
        //   },
        //   errorMessage:
        //     'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
        // },
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
