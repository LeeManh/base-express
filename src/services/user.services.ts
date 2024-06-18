import databaseService from './database.service'

class UserServices {
  async findByEmail(email: string) {
    const user = await databaseService.users.findOne({ email })

    return user
  }
}

const userServices = new UserServices()
export default userServices
