import { Response } from 'express'
import { HttpStatus } from '~/constants/httpStatus'
import { IBodyUpdateUser, RequestData, TokenPayload } from '~/constants/interfaces'
import userServices from '~/services/user.services'

export const getMe = async (req: RequestData<any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const user = await userServices.getMe(user_id)

  return res.status(HttpStatus.OK).json({
    message: 'Get user successfully',
    data: user
  })
}

export const updateMe = async (req: RequestData<any, IBodyUpdateUser>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  await userServices.updateMe(user_id, req.body)

  return res.status(HttpStatus.OK).json({
    message: 'Update user successfully'
  })
}

export const getProfile = async (req: RequestData<{ username: string }>, res: Response) => {
  const { username } = req.params

  const user = await userServices.getProfile(username)

  return res.status(HttpStatus.OK).json({
    message: 'Get user successfully',
    data: user
  })
}
