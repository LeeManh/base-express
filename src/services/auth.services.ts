import { User } from '~/models/schemas/User.schema'
import { IBodyLoginUser, IBodyRegisterUser } from './../constants/interfaces'
import databaseService from './database.service'
import { comparePassword, hashPassword } from '~/utils/password'
import { signToken } from '~/utils/jwt'
import { ErrorWithStatus } from '~/models/Error'
import { USERS_MESSAGES } from '~/constants/message'
import { HttpStatus } from '~/constants/httpStatus'
import { ObjectId } from 'mongodb'
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

  public async signTokens(user_id: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])

    return { access_token, refresh_token }
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
    const { access_token, refresh_token } = await this.signTokens(user_id)

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

  public async login(body: IBodyLoginUser) {
    const user = await databaseService.users.findOne({ email: body.email })
    if (!user) {
      throw new ErrorWithStatus({ message: USERS_MESSAGES.EMAIL_NOT_REGISTER, status: HttpStatus.UNAUTHORIZED })
    }

    // compare password
    const isValidPassword = await comparePassword(body.password, user.password)
    if (!isValidPassword) {
      throw new ErrorWithStatus({ message: USERS_MESSAGES.PASSWORD_IS_INCORRECT, status: HttpStatus.UNAUTHORIZED })
    }

    // create tokens
    const { access_token, refresh_token } = await this.signTokens(user._id.toString())

    // save refresh token to database
    await databaseService.users.updateOne(
      {
        _id: user._id
      },
      {
        $set: { refresh_token },
        $currentDate: { updated_at: true }
      }
    )

    return { access_token, refresh_token }
  }

  async logout(user_id: string) {
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: { refresh_token: '' },
        $currentDate: { updated_at: true }
      }
    )
  }
}

const authServices = new AuthServices()

export default authServices
