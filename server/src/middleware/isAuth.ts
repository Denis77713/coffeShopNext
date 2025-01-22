import { ApiError } from "../errors/api.error"
import { tokenServise } from "../service/account/tokenService"

export function isAuth(req: any, res: any, next: any) {
  try {
    
    const authorizasionHeader = req.headers.authorization
    if(!authorizasionHeader){
    console.log(authorizasionHeader)
      return next(ApiError.UnauthorizedError())
    }
    const authorizasionToken = authorizasionHeader.split(' ')[1]
    if(!authorizasionToken){
    console.log("authorizasionToken")

      return next(ApiError.UnauthorizedError())
    }
    const userData = tokenServise.validateAccessToken(authorizasionToken)
    if(!userData){
    console.log("userData")

      return next(ApiError.UnauthorizedError())
    }
    req.user = userData
    next()
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}
