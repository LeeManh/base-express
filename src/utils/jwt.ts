import jwt, { Secret, SignOptions } from 'jsonwebtoken'

export const signToken = ({
  payload,
  secretOrPrivateKey,
  options
}: {
  payload: string | Buffer | object
  secretOrPrivateKey: Secret
  options: SignOptions
}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
      if (err) {
        reject(err)
      }

      resolve(token)
    })
  })
}
