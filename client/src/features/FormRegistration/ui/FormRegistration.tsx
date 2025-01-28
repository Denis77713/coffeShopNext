"use client"

import { useState } from "react"
import style from "./FormRegistration.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { handleSubmit, registration } from "../api/api"
import { inputSecurity } from "@/security"
import { getAuth } from "@/shared/Form/ui/FormSlice"
import { useDispatch } from "react-redux"

export interface IError {
  text: string
  emali?: boolean
  password?: boolean
  activated?: boolean
}

const FormRegistration = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<IError | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const props = { email, password, setError, setEmail, setPassword, setStatus }
  const registrarionProps = {email, password,setEmail,setPassword,setStatus}
console.log(password)
const dispatch = useDispatch()

  return (
    <Form>
      <input
        className={`${inputStyle.input} ${error?.emali && style.inputError}`}
        type="email"
        name="email"
        placeholder="Введите email"
        value={email}
        onChange={(e) => setEmail(inputSecurity(e.target.value))}
      />
      <input
        className={`${inputStyle.input} ${error?.password && style.inputError}`}
        type="password"
        name="password"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(inputSecurity(e.target.value))}
      />
      <div className={style.error}>{error?.text}</div>
      {status && <div className={style.status}>{status}</div>}

      <Button handleClick={async (e:any) => {
       const data = await handleSubmit(e,registration(registrarionProps), props)
       dispatch(getAuth(data.status))

      }}>Регистрация</Button>
    </Form>
  )
}

export default FormRegistration
