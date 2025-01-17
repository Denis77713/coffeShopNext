import { prisma } from "../../../../client/prisma/prisma-client"
import { userService } from "../../service/account/userSevice"

class UserControllerClass {
  async registrarion(req: any, res: any, next: any) {
    try {
      const { email, password } = req.body
      const userData = await userService.registration(email, password)
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
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
