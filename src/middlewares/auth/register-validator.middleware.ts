import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { HttpStatus } from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import userServices from '~/services/user.services'
import { validate } from '~/utils/validate'
import { confirmPasswordValidator, dateOfBirthValidator, nameValidator, passwordValidator } from '../commom-validator'

export const registerValidator = validate(
  checkSchema(
    {
      name: nameValidator,
      email: {
        notEmpty: true,
        isEmail: true,
        trim: true,
        custom: {
          options: async (value) => {
            const user = await userServices.findByEmail(value)

            if (user) {
              throw new ErrorWithStatus({ message: USERS_MESSAGES.EMAIL_ALREADY_EXISTS, status: HttpStatus.CONFLICT })
            }

            return true
          }
        }
      },
      password: passwordValidator,
      confirm_password: confirmPasswordValidator,
      date_of_birth: dateOfBirthValidator
    },
    ['body']
  )
)
