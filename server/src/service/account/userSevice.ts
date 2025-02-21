import { prisma } from "../../../../client/prisma/prisma-client"
import bcrypt from "bcrypt"
// import uuid from "uuid"
import { v4 as uuidv4 } from "uuid"
import { mailService } from "../../service/account/mailService"
import { tokenServise } from "../../service/account/tokenService"
import { ApiError } from "../../errors/api.error"

interface IProductPayItem {
  id: number
  name: string
  imageUrl: string
  price: string
  best: string
  weight: string
  none: string
  drip: string
  number: number
  categoryId: number
}
interface IProductPay {
  userProduct: IProductPayItem[]
  complitePdoduct: IProductPayItem[]
  develery: IProductPayItem[]
}

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

class userServiceClass {
  async registration(
    email: string,
    password: string,
    name: string,
    lastName: string
  ) {
    // вывести первого юзера где совпадает email
    const userMail = await prisma.user.findFirst({
      where: { email: email },
    })
    // если найден юзер по емайлу выдать ошибку
    if (userMail) {
      throw ApiError.BadRequest("Пользователь с такой почтой уже существует")
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
        name: name,
        lastName: lastName,
        activationLink: activationLiinkMail,
      },
    })
    // Активация аккаунта по майлу
    // Отправляем ссылку на роут по которому будет активация
    await mailService.sendActivationMail(
      email,
      `${String(process.env.API_URL)}/api/activated/${activationLiinkMail}`
    )
    // Создаю объект юзера и сохраняю в него реального юзера из бд
    const userDto = new UserDtoClass(user.email, user.id, user.isActivated)
    // Генерирую токен в котором зашифрованы email, id, isActivated
    const tokens = tokenServise.generateToken({ ...userDto })
    // Создаю новый токен или перезаписываю
    await tokenServise.saveToken(user.id, tokens.refreshToken)
    // Верну токены и данные юзера
    return { ...tokens, user: userDto }
  }

  async activate(activationLink: string) {
    const user = await prisma.user.findFirst({
      where: {
        activationLink: activationLink,
      },
    })
    if (!user) {
      throw ApiError.BadRequest("Нет такой ссылки для активации")
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { isActivated: true },
    })
  }
  async login(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден")
    }
    const userPassword = await bcrypt.compare(password, String(user?.password))
    if (!userPassword) {
      throw ApiError.BadRequest("Неверный пароль")
    }
    // Создаю объект юзера и сохраняю в него реального юзера из бд
    const userDto = new UserDtoClass(user.email, user.id, user.isActivated)
    // Генерирую токен в котором зашифрованы email, id, isActivated
    const tokens = tokenServise.generateToken({ ...userDto })
    // Создаю новый токен или перезаписываю
    await tokenServise.saveToken(user.id, tokens.refreshToken)
    // Верну токены и данные юзера
    return { ...tokens, user: userDto }
  }
  async logout(refreshToken: any) {
    const userData = await prisma.token.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    })
    const tokenData = await prisma.token.delete({
      where: {
        userId: userData?.userId,
      },
    })
    return tokenData
  }
  async refresh(refreshToken: string) {
    console.log(refreshToken)
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenServise.validateRefreshToken(refreshToken)
    console.log(userData)
    const tokenFromDB = await tokenServise.findToken(refreshToken)
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError()
    }
    const user = await prisma.user.findFirst({
      where: {
        id: tokenFromDB?.userId,
      },
    })
    if (user) {
      const userDto = new UserDtoClass(user.email, user.id, user.isActivated)
      const tokens = tokenServise.generateToken({ ...userDto })
      await tokenServise.saveToken(user.id, tokens.refreshToken)
      return { ...tokens, user: userDto }
    }
  }
  async getAllUsers(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenServise.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenServise.findToken(refreshToken)
    if (!userData || tokenFromDB) {
      await ApiError.UnauthorizedError()
    }
    const user = await prisma.user.findFirst({
      where: {
        id: tokenFromDB?.userId,
      },
    })
    if (user) {
      return user
    }
  }
  async getProductService(refreshToken: string): Promise<IProductPay | null> {
    let result = null
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
      result = { userProduct, complitePdoduct, develery }
    }
    return result
  }
}
export const userService = new userServiceClass()
