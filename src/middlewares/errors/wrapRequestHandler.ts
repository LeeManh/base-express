import { Response, NextFunction, RequestHandler } from 'express'
import { RequestData } from '~/constants/interfaces'

export const wrapRequestHandler = <P>(func: RequestHandler<P>) => {
  return async (req: RequestData<P, any>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
