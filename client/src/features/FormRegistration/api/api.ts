import { api } from "@/widges/header/api/api"

type TypeRegistration = {
  lastName: string
  email: string
  name: string
  password: string
  lastNameError: boolean
  passwordError: boolean
  nameError: boolean
  emailError: boolean
  error: string
  message: string
}
export function getData(result: any) {
  const data = [
    {
      value: result?.name,
      styleError: result?.nameError,
      type: "text",
      name: "name",
      placeholder: "Введите свое имя",
    },
    {
      value: result?.lastName,
      styleError: result?.lastNameError,
      type: "text",
      name: "lastName",
      placeholder: "Введите свою фамилию",
    },
    {
      value: result?.email,
      styleError: result?.emailError,
      type: "email",
      name: "email",
      placeholder: "Введите email",
    },
    {
      value: result?.password,
      styleError: result?.passwordError,
      type: "password",
      name: "password",
      placeholder: "Введите пароль",
    },
  ]
  return data
}

export async function registration(preV: any, formData: any) {
  const validate: TypeRegistration = registrationValidation(preV, formData)
  const { name, email, password, lastName } = validate

  if (!validate.error) {
    try {
      const res = await api.post("/registration", {
        name,
        email,
        password,
        lastName,
      })

      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken)
      }
      validate.message = validate.email
      validate.email = ""
      validate.name = ""
      validate.lastName = ""
      validate.password = ""
    } catch (e) {
      const event: any = e
      const message = JSON.parse(event?.request?.responseText)
      validate.error = String(message.message)
    }
  }
  return validate
}
export function registrationValidation(preV: any, formData: any) {
  const name = formData.get("name")
  const password = formData.get("password")
  const email = formData.get("email")
  const lastName = formData.get("lastName")
  const testMail = validateEmail(email)

  const res = {
    lastName: lastName,
    email: email,
    name: name,
    password: password,
    lastNameError: true,
    passwordError: true,
    nameError: true,
    emailError: true,
    error: "",
    message: "",
  }
  if (name.length >= 3) res.nameError = false
  if (lastName.length >= 3) res.lastNameError = false
  if (password.length >= 6) res.passwordError = false
  if (testMail) res.emailError = false
  //
  if (res.nameError) res.error = "Имя должно состоять минимум из трех символов"
  if (res.lastNameError)
    res.error = "Фамилия должна состоять минимум из трех символов"
  if (res.emailError) res.error = "Заполните поле Email"
  if (res.passwordError)
    res.error = "Пароль должен состоять минимум из шести символов"
  return res
}

export async function logout() {
  const result = await api.post("/logout")
  if (result.status === 200) return false
}
export function validateEmail(email: string) {
  const result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  return result
}
