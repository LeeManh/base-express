import { Request, Response } from 'express'
import authServices from '~/services/auth.services'

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  await authServices.register({ email, password })

  return res.status(201).json({
    message: 'Register success'
  })
}
