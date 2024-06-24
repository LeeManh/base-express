import path from 'path'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { RequestData } from '~/constants/interfaces'
import { getNameFromFullname, handleUploadSingleImage } from '~/utils/files'
import fs from 'fs'

class MediasServices {
  async uploadSingleImage(req: RequestData<any>) {
    const file = await handleUploadSingleImage(req)
    const newFileName = getNameFromFullname(file.newFilename)
    const newFilePath = path.resolve(UPLOAD_DIR, `${newFileName}.jpg`)
    sharp.cache(false)
    await sharp(file.filepath).jpeg({ quality: 80 }).toFile(newFilePath)
    fs.unlinkSync(file.filepath)
    return `http://localhost:3000/upload/${newFileName}.jpg`
  }
}

const mediasServices = new MediasServices()
export default mediasServices
