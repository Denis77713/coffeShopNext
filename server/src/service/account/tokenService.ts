import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"
import { prisma } from "../../../../client/prisma/prisma-client"

class tokenServiseClass {
  // env переменные
  private readonly jwtAccessToken = String(
    configDotenv().parsed?.JWT_ACCESS_TOKEN
  )
  private readonly jwtRefreshToken = String(
    configDotenv().parsed?.JWT_REFRESH_TOKEN
  )
  private readonly timeToLiveAccessToken = String(
    configDotenv().parsed?.JWT_ACCESS_TOKEN_TiME_TO_LIVE
  )
  private readonly timeToLiveRefreshToken = String(
    configDotenv().parsed?.JWT_REFRESH_TOKEN_TiME_TO_LIVE
  )
  // Генерация токенов
  generateToken(payload: any) {
    const accessToken = jwt.sign(payload, this.jwtAccessToken, {
      expiresIn: this.timeToLiveAccessToken,
    })
    const refreshToken = jwt.sign(payload, this.jwtRefreshToken, {
      expiresIn: this.timeToLiveRefreshToken,
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    // вывести первую запись с userId из token
    const tokenData = await prisma.token.findFirst({
      where: { userId: userId },
    })
    // если токен есть то перезаписать
    if (tokenData) {
      tokenData.refreshToken = refreshToken

      await prisma.token.update({
        where: { userId: userId },
        data: {
          refreshToken: tokenData.refreshToken,
        },
      })
    } else {
      // если нет то создать новый токен
      await prisma.token.create({
        data: {
          refreshToken: refreshToken,
          userId: userId,
        },
      })
    }

    return refreshToken
  }
}

export const tokenServise = new tokenServiseClass()
