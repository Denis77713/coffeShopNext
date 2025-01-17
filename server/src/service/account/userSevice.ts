import { prisma } from "../../../../client/prisma/prisma-client"
import bcrypt from "bcrypt"
// import uuid from "uuid"
import { v4 as uuidv4 } from 'uuid';
import { mailService } from "../../service/account/mailService"
import { tokenServise } from "../../service/account/tokenService"

class UserDtoClass {
  email: string
  id: number
  isActivated: boolean

  constructor(email: string, id: number, isActivated: boolean) {
    this.email = email
    this.id = id
    this.isActivated = isActivated
  }
}

class userServiceClass {
  async registration(email: string, password: string) {
    const userMail = await prisma.user.findFirst({
      where: { email: email },
    })
    if (userMail) {
      throw new Error("пользователь с такой почтой уже существует")
    }
    // хэширование пароля
    const hashPassword = await bcrypt.hash(password, 3)
    // рандомная ссылка для активации майла
    const activationLiinkMail: any = uuidv4()
    
    // Создать пользоватея в бд
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        activationLink: activationLiinkMail,
      },
    })
    await mailService.sendActivationMail(email, activationLiinkMail)
    const userDto = new UserDtoClass(user.email, user.id, user.isActivated)
    const tokens = tokenServise.generateToken({...userDto})
    await tokenServise.saveToken(user.id,tokens.refreshToken)
    
    return {...tokens, user:userDto}
  }
}
export const userService = new userServiceClass()
// const activationLiinkMail = uuidv4()
// console.log(activationLiinkMail)
console.log(1232222)