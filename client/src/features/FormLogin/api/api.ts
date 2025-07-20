import { validateEmail } from "@/features/FormRegistration/api/api"
import { LoginType } from "@/shared/types/types"
import { api } from "@/widges/header/api/api"
//
//
//
export function LoginValidation(preV: any, formData: any) {
  const email = formData.get("email")
  const password = formData.get("password")
  const res = {
    password,
    email,
    mailError: true,
    pasError: true,
    ErrorMessage: "",
  }
  const emailValidate = validateEmail(email)
  if (emailValidate === null && password.length < 3)
    res.ErrorMessage = "Неправильная почта и пароль"
  if (emailValidate === null) {
    res.ErrorMessage = "Неправильная почта"
  } else {
    res.mailError = false
  }
  if (password.length < 3) {
    res.ErrorMessage = "Пароль минимум 3 символа"
  } else {
    res.pasError = false
  }
  return res
}
//
//
//
export async function loginFunction(preV: any, formData: any) {
  const resValidation: LoginType = LoginValidation(preV, formData)
  const email = resValidation.email
  const password = resValidation.password
  console.log(resValidation.ErrorMessage)
  let res
  if (resValidation.ErrorMessage === "") {
    try {
      res = await api.post("/login", { email, password })
      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken)
      }
      resValidation.data = res
    } catch (e) {
      const event: any = e
      resValidation.ErrorMessage = event.response.data.message
      if (event.response.data.message === "Неверный пароль")
        resValidation.pasError = true
      if (
        event.response.data.message === "Пользователь с таким email не найден"
      )
        resValidation.mailError = true
    }
  }
  return resValidation
}
