import path from 'path'
import { Response } from 'express'
import { RequestData } from '~/constants/interfaces'

export const uploadSingleImageController = async (req: RequestData<any>, res: Response) => {
  const formidable = (await import('formidable')).default

  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024 // 300KB
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    res.json({
      message: 'Upload image successfully'
    })
  })
}
