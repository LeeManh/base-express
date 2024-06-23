import path from 'path'
import { RequestData } from '~/constants/interfaces'

class MediasServices {
  async uploadSingleImage(req: RequestData<any>) {
    const formidable = (await import('formidable')).default

    const form = formidable({
      uploadDir: path.resolve('uploads'),
      maxFiles: 1,
      keepExtensions: true,
      maxFileSize: 300 * 1024, // 300KB
      filter: function ({ name, originalFilename, mimetype }) {
        const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
        if (!valid) {
          form.emit('error' as any, new Error('File type is not valid') as any)
        }
        return valid
      }
    })

    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err)
        }
        // eslint-disable-next-line no-extra-boolean-cast
        if (!Boolean(files.image)) {
          return reject(new Error('File is empty'))
        }
        resolve(files)
      })
    })
  }
}

const mediasServices = new MediasServices()
export default mediasServices