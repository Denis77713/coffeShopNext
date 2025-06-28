"use client"

import { useActionState, useEffect, useState } from "react"
import style from "./FormRegistration.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { registrationValidate, registration } from "../api/api"
import { inputSecurity } from "@/security"
import { getAuth } from "@/shared/reducers/FormSlice"
import { useDispatch } from "react-redux"

export interface IError {
  text: string
  emali?: boolean
  password?: boolean
  activated?: boolean
  name?: boolean
  lastName?: boolean
}

const FormRegistration = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [error, setError] = useState<IError | null>({ text: "" })
  const [status, setStatus] = useState<string | null>(null)
  const [load, setLoad] = useState(false)

  // const [result, formAction, isPending] = useActionState(getFormData, null)

  const props = {
    email,
    password,
    name,
    lastName,
    setError,
  }

  const registrarionProps = {
    email,
    password,
    name,
    lastName,
    setEmail,
    setPassword,
    setName,
    setLastName,
    setStatus,
  }
  const dispatch = useDispatch()

  useEffect(() => {
    async function reistr() {
      if (error === null) {
        const data: any = await registration(
          registrarionProps,
          setLoad,
          setError
        )
        data && dispatch(getAuth(data.status))
      }
    }
    reistr()
  }, [error])
  return (
    <Form>
      {load && <div>Loading.......</div>}
      <input
        className={`${inputStyle.input} ${error?.name && style.inputError}`}
        type="text"
        name="name"
        placeholder="Введите свое имя"
        value={name}
        onChange={(e) => setName(inputSecurity(e.target.value))}
      />
      <input
        className={`${inputStyle.input} ${error?.lastName && style.inputError}`}
        type="text"
        name="lastName"
        placeholder="Введите свою фамилию"
        value={lastName}
        onChange={(e) => setLastName(inputSecurity(e.target.value))}
      />
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

      <Button
        handleClick={async (e: any) => {
          await registrationValidate(e, props)
        }}
      >
        Регистрация
      </Button>
    </Form>
  )
}

export default FormRegistration
