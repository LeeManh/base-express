import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validate'
import {
  dateOfBirthValidator,
  nameValidator,
  bioValidator,
  websiteValidator,
  userNameValidator,
  imageValidator
} from '../commom-validator'

export const updateMeValidator = validate(
  checkSchema(
    {
      name: {
        optional: true,
        ...nameValidator
      },
      date_of_birth: {
        ...dateOfBirthValidator,
        optional: true
      },
      bio: {
        optional: true,
        ...bioValidator
      },
      location: {
        optional: true,
        ...bioValidator
      },
      website: {
        optional: true,
        ...websiteValidator
      },
      username: {
        optional: true,
        ...userNameValidator
      },
      avatar: {
        optional: true,
        ...imageValidator
      },
      cover_photo: {
        optional: true,
        ...imageValidator
      }
    },
    ['body']
  )
)
