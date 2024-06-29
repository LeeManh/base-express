import { Router } from 'express'
import { uploadImagesController, uploadVideosController } from '~/controllers/medias.controllers'
import { accessTokenValidator } from '~/middlewares/auth/accessTokenValidator'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'
import { verifiedUserValidator } from '~/middlewares/users/verifiedUserValidator'

const mediasRouter = Router()

mediasRouter.post(
  '/upload-image',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadImagesController)
)

mediasRouter.post(
  '/upload-video',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideosController)
)

export default mediasRouter
