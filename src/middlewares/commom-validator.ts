import { USERS_MESSAGES } from '~/constants/message'

const nameValidator = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
  },
  trim: true
}

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

const dateOfBirthValidator = {
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    },
    errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_MUST_BE_A_DATE
  }
}

const bioValidator = {
  isString: {
    errorMessage: USERS_MESSAGES.BIO_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 200
    },
    errorMessage: USERS_MESSAGES.BIO_LENGTH
  }
}

const locationValidator = {
  isString: {
    errorMessage: USERS_MESSAGES.LOCATION_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 200
    },
    errorMessage: USERS_MESSAGES.LOCATION_LENGTH
  }
}

const websiteValidator = {
  isString: {
    errorMessage: USERS_MESSAGES.WEBSITE_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 200
    },
    errorMessage: USERS_MESSAGES.WEBSITE_LENGTH
  }
}

const userNameValidator = {
  isString: {
    errorMessage: USERS_MESSAGES.USERNAME_MUST_BE_STRING
  },
  trim: true,

  isLength: {
    options: {
      min: 1,
      max: 50
    },
    errorMessage: USERS_MESSAGES.USERNAME_LENGTH
  }
}

const imageValidator = {
  isString: {
    errorMessage: USERS_MESSAGES.IMAGE_URL_MUST_BE_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 400
    },
    errorMessage: USERS_MESSAGES.IMAGE_URL_LENGTH
  }
}

export {
  passwordValidator,
  confirmPasswordValidator,
  nameValidator,
  dateOfBirthValidator,
  bioValidator,
  locationValidator,
  websiteValidator,
  userNameValidator,
  imageValidator
}
