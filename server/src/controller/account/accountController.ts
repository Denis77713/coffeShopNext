import { prisma } from "../../../../client/prisma/prisma-client"
import { userService } from "../../service/account/userSevice"
import { validationResult } from "express-validator"
import { ApiError } from "../../errors/api.error"

class UserControllerClass {
  async registrarion(req: any, res: any, next: any) {
    // Результат валидации с роута регистрации, проверяет тело запросса
    const errors = validationResult(req)
    //  errors = false значит есть ошибка валидации в роуте регистрации
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Ошибка валидации", errors.array()))
    }
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
      next(e)
    }
  }
  async login(req: any, res: any, next: any) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      // Сохраняю refreshToken в куки и даю ему время жизни,
      // запрещаю refreshToken менять на клиенте через httpOnly: true
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      // Вернуть Юзера
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async logout(req: any, res: any, next: any) {
    try {
    } catch (e) {
      next(e)
    }
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
    } catch (e) {
      next(e)
    }
  }
  async refresh(req: any, res: any, next: any) {
    try {
    } catch (e) {
      next(e)
    }
  }
  async getUsers(req: any, res: any, next: any) {
    try {
      const result = await prisma.category.findMany()
      console.log(result)
      console.log(result)
    } catch (e) {
      next(e)
    }
  }
}

export const UserController = new UserControllerClass()
