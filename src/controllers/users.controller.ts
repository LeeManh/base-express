import { Response } from 'express'
import { HttpStatus } from '~/constants/httpStatus'
import { RequestBody, TokenPayload } from '~/constants/interfaces'
import userServices from '~/services/user.services'

export const getMe = async (req: RequestBody<any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const user = await userServices.getMe(user_id)

  return res.status(HttpStatus.OK).json({
    message: 'Get user successfully',
    data: user
  })
}
