import { User } from '~/models/schemas/User.schema'
import { IBodyRegisterUser } from './../constants/interfaces'
import databaseService from './database.service'
import { hashPassword } from '~/utils/password'
import { signToken } from '~/utils/jwt'
export class AuthServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id },
      secretOrPrivateKey: process.env.ACCESS_TOKEN_SECRET,
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id },
      secretOrPrivateKey: process.env.REFRESH_TOKEN_SECRET,
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    })
  }

  public async register(body: IBodyRegisterUser) {
    const user = await databaseService.users.insertOne(
      new User({
        ...body,
        date_of_birth: new Date(body.date_of_birth),
        password: await hashPassword(body.password)
      })
    )

    const user_id = user.insertedId.toString()

    // create tokens
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])

    // save refresh token to database
    await databaseService.users.updateOne(
      {
        _id: user.insertedId
      },
      {
        $set: { refresh_token },
        $currentDate: { updated_at: true }
      }
    )

    return { access_token, refresh_token }
  }
}

const authServices = new AuthServices()

export default authServices
