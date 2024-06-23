import path from 'path'
import { Response } from 'express'
import { RequestData } from '~/constants/interfaces'
import mediasServices from '~/services/medias.services'
import { HttpStatus } from '~/constants/httpStatus'

export const uploadSingleImageController = async (req: RequestData<any>, res: Response) => {
  const data = await mediasServices.uploadSingleImage(req)

  return res.status(HttpStatus.OK).json({
    message: 'Image uploaded successfully',
    data
  })
}
