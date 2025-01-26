import { api } from "@/widges/header/api/api"

export async function registration(email: any, password: any) {
  const res = await api.post("/registration", { email, password })
  if (res.data.accessToken) {
    localStorage.setItem("token", res.data.accessToken)
    console.log(res.data)
    console.log(res.status)
  }
  return res
}
type TProps = {
  email: string
  password: string
  setError: any
  setEmail: any
  setPassword: any
  setStatus :any
}
export async function handleSubmit(e: any, props:TProps) {
  e.preventDefault()
  const {email, password, setError, setEmail, setPassword, setStatus} = props
  const emailValidate = validateEmail(email)
  if (emailValidate === null && password.length < 3) {
    setError({
      text: "Неправильная почта и пароль",
      emali: true,
      password: true,
    })
  } else if (emailValidate === null) {
    setError({ text: "Неправильная почта", emali: true })
  } else if (password.length < 3) {
    setError({ text: "Пароль минимум 3 символа", password: true })
  } else {
    setError(null)
    const data = await registration(email, password)
    setEmail("")
    setPassword("")
    data.status === 200 && setStatus("Ссылка для активации отправлена на зарегистрированную почту")
  }
}
function validateEmail(email: string) {
  const result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  return result
}
