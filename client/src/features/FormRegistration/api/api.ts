import { api } from "@/widges/header/api/api"

type TProps = {
  email: string
  password: string
  name: string
  lastName: string
  setError: any
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

export async function registration(registrationProps: any) {
  let res
  const {
    email,
    password,
    name,
    lastName,
    setEmail,
    setPassword,
    setName,
    setLastName,
    setStatus,
  } = registrationProps
  try {
    res = await api.post("/registration", { email, password, name, lastName })
    if (res.data.accessToken) {
      localStorage.setItem("token", res.data.accessToken)
    }
    setEmail("")
    setPassword("")
    setName("")
    setLastName("")
    res.status === 200 &&
      setStatus("Ссылка для активации отправлена на зарегистрированную почту")
    // }
  } catch (e) {
    res = e
  }
  return res
}
export async function handleSubmit(e: any, props: TProps) {
  e.preventDefault()
  let resolve
  try {
    const { email, password, name, lastName, setError } = props
    const emailValidate = validateEmail(email)

    if (
      emailValidate === null &&
      password.length < 3 &&
      name.length === 0 &&
      lastName.length === 0
    ) {
      setError({
        text: "Неправильная почта и пароль",
        emali: true,
        password: true,
        name: true,
        lastName: true,
      })
    } else if (name.length === 0 && lastName.length === 0) {
      setError({
        text: "Введите имя и отчество",
        name: true,
        lastName: true,
      })
    } else if (emailValidate === null) {
      setError({ text: "Неправильная почта", emali: true })
    } else if (password.length < 3) {
      setError({ text: "Пароль минимум 3 символа", password: true })
    } else if (name.length === 0) {
      setError({ text: "Введите свое имя", name: true })
    } else if (lastName.length === 0) {
      setError({ text: "Введите свою фамилию", lastName: true })
    } else {
      setError(null)
    }
  } catch (e) {
    resolve = e
  }
  return resolve
}

export async function logout() {
  const result = await api.post("/logout")
  if (result.status === 200) return false
}
function validateEmail(email: string) {
  const result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  return result
}
