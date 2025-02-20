import { prisma } from "../../../../client/prisma/prisma-client"
import { userService } from "../../service/account/userSevice"
import { validationResult } from "express-validator"
import { ApiError } from "../../errors/api.error"

export type IProductCart = {
  id: number
  imageUrl: string
  price: string
  name: string
  number: number
}
function getFilter(productPay: any, text: string) {
  const getUserProduct = productPay
    .filter((item: any) => item.status === text)
    .map((item: any) => item.productId)
    .flat()
  return getUserProduct
}
async function getDataUser(params: any) {
  const posts = await prisma.product.findMany({
    where: {
      id: {
        in: params,
      },
    },
  })
  return posts
}
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
      const { email, password, name, lastName } = req.body
      // Вызываю функцию регистрации, а в userData сохраняю токены и юзера
      const userData = await userService.registration(
        email,
        password,
        name,
        lastName
      )
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
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie("refreshToken")
      return res.json(token)
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
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      if (userData) {
        res.cookie("refreshToken", userData?.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        // Вернуть Юзера
        return res.json(userData)
      }
    } catch (e) {
      next(e)
    }
  }
  async getUsers(req: any, res: any, next: any) {
    try {
      const { refreshToken } = req.cookies

      const users = await userService.getAllUsers(refreshToken)
      res.json(users)
    } catch (e) {
      next(e)
    }
  }
  async getCartPay(req: any, res: any, next: any) {
    try {
      const { refreshToken } = req.cookies
      const { data, sum } = req.body
      const user = await prisma.token.findFirst({
        where: { refreshToken: refreshToken },
      })
      const arrId = data.map((item: IProductCart) => item.id)
      if (user && data && refreshToken) {
        await prisma.productPay.create({
          data: {
            userId: user.userId,
            productId: arrId,
            sum: sum,
          },
        })
        res.json(res.status)
      }
    } catch (e) {
      next(e)
    }
  }
  async getProduct(req: any, res: any, next: any) {
    const { refreshToken } = req.cookies
    const userId = await prisma.token.findFirst({
      where: { refreshToken: refreshToken },
    })
    if (userId) {
      const productPay = await prisma.productPay.findMany({
        where: {
          userId: userId.userId,
        },
      })
      const getUserProduct = getFilter(productPay, "Получен")
      const getComplitePdoduct = getFilter(productPay, "Успешный заказ")
      const getDevelery = getFilter(productPay, "Доставлен")
      //
      const userProduct = await getDataUser(getUserProduct)
      const complitePdoduct = await getDataUser(getComplitePdoduct)
      const develery = await getDataUser(getDevelery)
      console.log(userProduct)
      res.json({
        userProduct: userProduct,
        complitePdoduct: complitePdoduct,
        develery: develery,
      })
    }
  }
}

export const UserController = new UserControllerClass()
