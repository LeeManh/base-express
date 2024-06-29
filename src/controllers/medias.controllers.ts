import path from 'path'
import { NextFunction, Request, Response } from 'express'
import { RequestData } from '~/constants/interfaces'
import mediasServices from '~/services/medias.services'
import { HttpStatus } from '~/constants/httpStatus'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { config } from 'dotenv'
import fs from 'fs'

config()

export const uploadImagesController = async (req: RequestData<any>, res: Response) => {
  const data = await mediasServices.uploadImages(req)

  return res.status(HttpStatus.OK).json({
    message: 'Image uploaded successfully',
    data
  })
}

export const uploadVideosController = async (req: RequestData<any>, res: Response) => {
  const data = await mediasServices.uploadVideos(req)

  return res.status(HttpStatus.OK).json({
    message: 'Video uploaded successfully',
    data
  })
}

export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params

  const filePath = path.resolve(UPLOAD_IMAGE_DIR, name)

  // Check if the file exists before sending it
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Not found')
  }

  // Send the file
  return res.sendFile(filePath, (err) => {
    if (err) {
      next(err) // Pass the error to the next middleware
    }
  })
}

export const serveVideoController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params

  const filePath = path.resolve(UPLOAD_VIDEO_DIR, name)

  // Check if the file exists before sending it
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Not found')
  }

  // Send the file
  return res.sendFile(filePath, (err) => {
    if (err) {
      next(err) // Pass the error to the next middleware
    }
  })
}
