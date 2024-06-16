import { User } from '~/models/schemas/User.schema'
import { RegisterUserDto } from './../constants/interfaces'
import databaseService from './database.service'

export class AuthServices {
  public async register({ email, password }: RegisterUserDto) {
    const user = await databaseService.users.insertOne(new User({ email, password }))

    return user
  }
}

const authServices = new AuthServices()

export default authServices
