import { Request } from 'express'
import { USERS_MESSAGES } from '~/constants/message'

const passwordValidator = {
  trim: true,
  notEmpty: {
    errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
  }
}

const confirmPasswordValidator = {
  notEmpty: true,
  isString: true,
  isLength: {
    options: {
      min: 6,
      max: 50
    }
  },
  custom: {
    options: (value: string, { req }: { req: any }) => {
      if (value !== req.body.password) {
        throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
      }
      return true
    }
  }
}

export { passwordValidator, confirmPasswordValidator }
