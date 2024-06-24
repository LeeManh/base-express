import path from 'path'
import { Request, Response } from 'express'
import { RequestData } from '~/constants/interfaces'
import mediasServices from '~/services/medias.services'
import { HttpStatus } from '~/constants/httpStatus'
import { UPLOAD_DIR } from '~/constants/dir'
import { config } from 'dotenv'

config()

export const uploadImagesController = async (req: RequestData<any>, res: Response) => {
  const data = await mediasServices.uploadImages(req)

  return res.status(HttpStatus.OK).json({
    message: 'Image uploaded successfully',
    data
  })
}

export const serveImageController = (req: Request, res: Response) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}
