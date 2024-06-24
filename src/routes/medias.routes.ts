import { Router } from 'express'
import { uploadImagesController } from '~/controllers/medias.controllers'
import { wrapRequestHandler } from '~/middlewares/errors/wrapRequestHandler'

const mediasRouter = Router()

mediasRouter.post('/upload-image', wrapRequestHandler(uploadImagesController))

export default mediasRouter
