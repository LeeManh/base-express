import { Router } from 'express'
import {
  forgotPasswordController,
  loginController,
  loginGoogleController,
  logoutController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  verifyEmailController
} from '~/controllers/auth.controllers'
import { accessTokenValidator } from '~/middlewares/auth/accessTokenValidator'
import { forgotPasswordValidator } from '~/middlewares/auth/forgotPasswordValidator'
import { loginValidator } from '~/middlewares/auth/loginValidator'
import { refreshTokenValidator } from '~/middlewares/auth/refreshTokenValidator'
import { registerValidator } from '~/middlewares/auth/registerValidator'
import { resetPasswordValidator } from '~/middlewares/auth/resetPasswordValidator'
import { verifyEmailValidator } from '~/middlewares/auth/verifyEmailValidator'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'

const authRouter = Router()

authRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
authRouter.post('/logout', accessTokenValidator, wrapRequestHandler(logoutController))
authRouter.post('/verify-email', verifyEmailValidator, wrapRequestHandler(verifyEmailController))
authRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))
authRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

authRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))
authRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))
authRouter.get('/oauth/google', wrapRequestHandler(loginGoogleController))

export default authRouter
