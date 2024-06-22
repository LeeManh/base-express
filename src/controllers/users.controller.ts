import { Response } from 'express'
import { HttpStatus } from '~/constants/httpStatus'
import { IBodyUpdateUser, RequestBody, TokenPayload } from '~/constants/interfaces'
import userServices from '~/services/user.services'

export const getMe = async (req: RequestBody<any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const user = await userServices.getMe(user_id)

  return res.status(HttpStatus.OK).json({
    message: 'Get user successfully',
    data: user
  })
}

export const updateMe = async (req: RequestBody<IBodyUpdateUser>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  await userServices.updateMe(user_id, req.body)

  return res.status(HttpStatus.OK).json({
    message: 'Update user successfully'
  })
}
