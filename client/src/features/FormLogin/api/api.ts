import { validateEmail } from "@/features/FormRegistration/api/api"
import { api } from "@/widges/header/api/api"

interface IPropsLogin {
  email: string
  password: string
  setError: any
  setEmail: any
  setPassword: any
  setStatus: any
}

export async function LoginValidation(e: any, props: IPropsLogin) {
  e.preventDefault()
  let resolve
  try {
    const { email, password, setError } = props
    const emailValidate = validateEmail(email)

    if (emailValidate === null && password.length < 3) {
      setError({
        text: "Неправильная почта и пароль",
        emali: true,
        password: true,
        name: true,
        lastName: true,
      })
    } else if (emailValidate === null) {
      setError({ text: "Неправильная почта", emali: true })
    } else if (password.length < 3) {
      setError({ text: "Пароль минимум 3 символа", password: true })
    } else {
      setError(null)
    }
  } catch (e) {
    resolve = e
  }
  return resolve
}
export async function login(loginProps: any) {
  const { email, password, setEmail, setPassword } = loginProps
  let res
  try {
    res = await api.post("/login", { email, password })
    if (res.data.accessToken) {
      localStorage.setItem("token", res.data.accessToken)
    }
    setEmail("")
    setPassword("")
  } catch (e) {
    res = e
  }
  return res
}
