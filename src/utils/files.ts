import { Request } from 'express'
import { File } from 'formidable'
import path from 'path'
import { UPLOAD_TEMP_DIR } from '~/constants/dir'
import fs from 'fs'

export const initFolder = () => {
  if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
    fs.mkdirSync(UPLOAD_TEMP_DIR, {
      recursive: true // mục đích là để tạo folder nested
    })
  }
}

export const handleUploadImages = async (req: Request) => {
  const formidable = (await import('formidable')).default

  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    maxFiles: 4,
    keepExtensions: true,
    maxFileSize: 300 * 1024, // 300KB
    maxTotalFileSize: 4 * 300 * 1024, // 4 files * 300KB,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'images' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.images)) {
        return reject(new Error('File is empty'))
      }
      resolve(files.images as File[])
    })
  })
}

export const getNameFromFullname = (fullname: string) => {
  const nameArr = fullname.split('.')
  nameArr.pop()
  return nameArr.join('')
}
