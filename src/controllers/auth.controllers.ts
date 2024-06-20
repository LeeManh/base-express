import { Response } from 'express'
import { HttpStatus } from '~/constants/httpStatus'
import { IBodyLoginUser, IBodyRegisterUser, RequestBody, TokenPayload } from '~/constants/interfaces'
import authServices from '~/services/auth.services'

export const registerController = async (req: RequestBody<IBodyRegisterUser>, res: Response) => {
  const { access_token, refresh_token } = await authServices.register(req.body)

  return res.status(HttpStatus.CREATED).json({
    message: 'Register success',
    data: {
      access_token,
      refresh_token
    }
  })
}

export const loginController = async (req: RequestBody<IBodyLoginUser>, res: Response) => {
  const data = await authServices.login(req.body)

  return res.status(HttpStatus.OK).json({
    message: 'Login success',
    data
  })
}

export const logoutController = async (req: RequestBody<any>, res: Response) => {
  const decoded_authorization = req.decoded_authorization as TokenPayload

  await authServices.logout(decoded_authorization.user_id)

  return res.status(HttpStatus.OK).json({
    message: 'Logout success'
  })
}
