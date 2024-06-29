import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir'
import { Media, RequestData } from '~/constants/interfaces'
import { getNameFromFullname, handleUploadImages, handleUploadVideos } from '~/utils/files'
import fs from 'fs'
import { isProduction } from '~/constants/configs'
import { config } from 'dotenv'
import { MediaType } from '~/constants/enum'
import { Request } from 'express'
config()

class MediasServices {
  async uploadImages(req: RequestData<any>) {
    const files = await handleUploadImages(req)

    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newFileName = getNameFromFullname(file.newFilename)
        const newFilePath = path.resolve(UPLOAD_IMAGE_TEMP_DIR, `${newFileName}.jpg`)
        sharp.cache(false)
        await sharp(file.filepath).jpeg({ quality: 80 }).toFile(newFilePath)
        fs.unlinkSync(file.filepath)

        const url = isProduction
          ? `${process.env.HOST}/static/image/${newFileName}.jpg`
          : `http://localhost:${process.env.PORT}/static/image/${newFileName}.jpg`

        return {
          url,
          type: MediaType.Image
        }
      })
    )

    return result
  }

  async uploadVideos(req: Request) {
    const files = await handleUploadVideos(req)
    const result: Media[] = files.map((file) => {
      return {
        url: isProduction
          ? `${process.env.HOST}/static/video/${file.newFilename}`
          : `http://localhost:${process.env.PORT}/static/video/${file.newFilename}`,
        type: MediaType.Video
      }
    })
    return result
  }
}

const mediasServices = new MediasServices()
export default mediasServices
