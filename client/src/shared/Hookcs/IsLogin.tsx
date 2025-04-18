import { useEffect } from "react"
import UseLogin from "./UseLogin"
import { api } from "@/widges/header/api/api"

const IsLogin = (setCategory: any, func: any) => {
  UseLogin()
  useEffect(() => {
    async function Login() {
      try {
        const data = await func()
        setCategory(data)
      } catch {
        localStorage.removeItem("token")
        try {
          await api.get("/refresh")
        } catch {
          const data = await api.get("/refresh")
          localStorage.setItem("token", data.data.accessToken)
          await api.get("/users")
          const qwe = await func()
          setCategory(qwe)
        }
      }
    }
    Login()
  }, [])

  return null
}

export default IsLogin
