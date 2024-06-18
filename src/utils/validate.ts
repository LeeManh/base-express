import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { HttpStatus } from '~/constants/httpStatus'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run the validation
    await validation.run(req)

    // Check if there are validation errors
    const errors = validationResult(req)

    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.mapped() })
    }

    // If there are no validation errors, proceed to the next middleware
    next()
  }
}
