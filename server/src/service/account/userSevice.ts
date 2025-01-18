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
    // вывести первого юзера где совпадает email
    const userMail = await prisma.user.findFirst({
      where: { email: email },
    })
    // если найден юзер по емайлу выдать ошибку
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
    // Активация аккаунта по майлу
    // Отправляем ссылку на роут по которому будет активация
    await mailService.sendActivationMail(email, `${String(process.env.API_URL)}/api/activate/${activationLiinkMail}`)
      // await mailService.test()
    // 

    const userDto = new UserDtoClass(user.email, user.id, user.isActivated)
    const tokens = tokenServise.generateToken({...userDto})
    //  
    await tokenServise.saveToken(user.id,tokens.refreshToken)
    
    return {...tokens, user:userDto}
  }
}
export const userService = new userServiceClass()
