export const USERS_MESSAGES = {
  EMAIL_NOT_REGISTER: 'Email not registered',
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',
  PASSWORD_IS_INCORRECT: 'Password is incorrect',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  EMAIL_VERIFICATION_TOKEN_IS_REQUIRED: 'Email verification token is required',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFIED: 'Email already verified',
  EMAIL_NOT_FOUND: 'Email not found',
  USER_NOT_VERIFIED: 'User not verified',
  USER_BANNED: 'User banned',
  DATE_OF_BIRTH_MUST_BE_A_DATE: 'Date of birth must be a date',
  BIO_MUST_BE_STRING: 'Bio must be a string',
  BIO_LENGTH: 'Bio length must be from 1 to 200',
  LOCATION_MUST_BE_STRING: 'Location must be a string',
  LOCATION_LENGTH: 'Location length must be from 1 to 200',
  WEBSITE_MUST_BE_STRING: 'Website must be a string',
  WEBSITE_LENGTH: 'Website length must be from 1 to 200',
  USERNAME_MUST_BE_STRING: 'User name must be a string',
  USERNAME_LENGTH: 'User name length must be from 1 to 50',
  IMAGE_URL_MUST_BE_STRING: 'Image URL must be a string',
  IMAGE_URL_LENGTH: 'Image URL length must be from 1 to 400',
  INVALID_USER_ID: 'Invalid user ID',
  USER_ALREADY_FOLLOWED: 'User already followed',
  FOLLOW_USER_ID_IS_REQUIRED: 'followed_user_id is required',
  CANNOT_FOLLOW_YOURSELF: 'Cannot follow yourself',
  USER_ID_IS_REQUIRED: 'user_id is required',
  CANNOT_UN_FOLLOW_YOURSELF: 'Cannot unfollow yourself',
  USER_NOT_FOLLOWED: 'User not followed',
  USERNAME_ALREADY_EXISTS: 'username already exists',
  OLD_PASSWORD_IS_INCORRECT: 'Old password is incorrect',
  GMAIL_NOT_VERIFIED: 'Gmail not verified',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required'
} as const

export const TWEETS_MESSAGES = {
  INVALID_TYPE: 'Invalid type',
  INVALID_AUDIENCE: 'Invalid audience',
  PARENT_ID_MUST_BE_A_VALID_TWEET_ID: 'Parent id must be a valid tweet id',
  PARENT_ID_MUST_BE_NULL: 'Parent id must be null',
  CONTENT_MUST_BE_A_NON_EMPTY_STRING: 'Content must be a non-empty string',
  CONTENT_MUST_BE_EMPTY_STRING: 'Content must be empty string',
  HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING: 'Hashtags must be an array of string',
  MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID: 'Mentions must be an array of user id',
  MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT: 'Medias must be an array of media object'
} as const

export const BOOKMARK_MESSAGES = {
  BOOKMARK_SUCCESSFULLY: 'Bookmark successfully'
} as const
