import { prisma } from "../../../../client/prisma/prisma-client"
import { userService } from "../../service/account/userSevice"

class UserControllerClass {
  async registrarion(req: any, res: any, next: any) {
    try {
      // Получаю из тела запросса майл и пароль
      const { email, password } = req.body
      // Вызываю функцию регистрации, а в userData сохраняю токены и юзера
      const userData = await userService.registration(email, password)
      // Сохраняю refreshToken в куки и даю ему время жизни, 
      // запрещаю refreshToken менять на клиенте через httpOnly: true 
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      // Вернуть Юзера
      return res.json(userData)
    } catch (e) {
      console.log(e)
    }
  }
  async login(req: any, res: any, next: any) {
    try {
    } catch (e) {}
  }
  async logout(req: any, res: any, next: any) {
    try {
    } catch (e) {}
  }
  async activated(req: any, res: any, next: any) {
    try {
       // Получаем link /activated/:link, из роутов 
       const activationLink = req.params.link
       // Вызываю функцию активации из сервиса
       // Функция менят поле isActivated на true в табл user в бд
       await userService.activate(activationLink)
       // редирект на главную
       return res.redirect(process.env.CLIENT_URL)
    } catch (e) {}
  }
  async refresh(req: any, res: any, next: any) {
    try {
    } catch (e) {}
  }
  async getUsers(req: any, res: any, next: any) {
    try {
      const result = await prisma.category.findMany()
      console.log(result)
      console.log(result)
    } catch (e) {}
  }
}

export const UserController = new UserControllerClass()
