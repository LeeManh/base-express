import { NextFunction, Request, Response } from 'express'
import { UserVerifyStatus } from '~/constants/enum'
import { HttpStatus } from '~/constants/httpStatus'
import { TokenPayload } from '~/constants/interfaces'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'

export const verifiedUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const { verify } = req.decoded_authorization as TokenPayload

  if (verify === UserVerifyStatus.Unverified) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_NOT_VERIFIED,
      status: HttpStatus.FORBIDDEN
    })
  }

  if (verify === UserVerifyStatus.Banned) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_BANNED,
      status: HttpStatus.FORBIDDEN
    })
  }

  next()
}
