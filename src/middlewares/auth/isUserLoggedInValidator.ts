import { NextFunction, Request, Response } from 'express'

export const isUserLoggedInValidator = (middleware: (req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.headers?.authorization) {
      return middleware(req, res, next)
    }
    next()
  }
}
