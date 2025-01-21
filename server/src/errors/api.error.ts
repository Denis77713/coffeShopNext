
export class ApiError extends Error {
  status: number
  errors: string | never[]
  constructor(status: number, message: string, errors: string | never[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }
  // Пользователь не авторизован
  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован")
  }
  static BadRequest(message: string, errors?: string) {
    return new ApiError(400, message, errors)
  }
}
