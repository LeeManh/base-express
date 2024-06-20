import { HttpStatus } from '~/constants/httpStatus'

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>

export class ErrorWithStatus {
  message: string
  status: HttpStatus

  constructor({ message, status }: { message: string; status: HttpStatus }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType

  constructor({ message = 'Validation Error', errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HttpStatus.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
