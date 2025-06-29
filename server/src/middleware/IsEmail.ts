import { prisma } from "../../../client/prisma/prisma-client"
import { ApiError } from "../errors/api.error"
import { tokenServise } from "../service/account/tokenService"

export async function isEmail(req: any, res: any, next: any) {
  const { email, password, name, lastName } = req.body
  console.log(email)
  try {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    if (result) next(ApiError.MailErorr())
    next()
  } catch (e) {
    return next(ApiError.MailErorr())
  }
}
