import jwt, { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken'
import { config } from 'dotenv'
import { ErrorWithStatus } from '~/models/Error'
import { HttpStatus } from '~/constants/httpStatus'
import { capitalize } from 'lodash'

config()

export const signToken = ({
  payload,
  secretOrPrivateKey,
  options
}: {
  payload: string | Buffer | object
  secretOrPrivateKey: Secret
  options: SignOptions
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
      if (err) {
        reject(err)
      }

      resolve(token as string)
    })
  })
}

export const verifyToken = ({
  token,
  options,
  secretOrPublicKey = process.env.ACCESS_TOKEN_SECRET
}: {
  token: string
  secretOrPublicKey?: Secret
  options?: VerifyOptions & { complete: true }
}) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err, decoded) => {
      if (err) {
        reject(
          new ErrorWithStatus({
            message: capitalize(err.message),
            status: HttpStatus.UNAUTHORIZED
          })
        )
      }

      resolve(decoded)
    })
  })
}
