import { Router } from 'express'
import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  verifyEmailController
} from '~/controllers/auth.controllers'
import { accessTokenValidator } from '~/middlewares/auth/access-token-validator.middleware'
import { forgotPasswordValidator } from '~/middlewares/auth/forgot-password-validator.middleware'
import { loginValidator } from '~/middlewares/auth/login-validator.middleware'
import { registerValidator } from '~/middlewares/auth/register-validator.middleware'
import { resetPasswordValidator } from '~/middlewares/auth/reset-password-validator.middleware'
import { verifyEmailValidator } from '~/middlewares/auth/verify-email-validator.middleware'
import { wrapRequestHandler } from '~/middlewares/wrapRequestHandler'

const authRouter = Router()

authRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
authRouter.post('/logout', accessTokenValidator, wrapRequestHandler(logoutController))
authRouter.post('/verify-email', verifyEmailValidator, wrapRequestHandler(verifyEmailController))
authRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

authRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))
authRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

export default authRouter
