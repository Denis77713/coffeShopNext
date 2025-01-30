"use client"

import { useState } from "react"
import style from "../../FormRegistration/ui/FormRegistration.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { handleSubmit, login } from "../../FormRegistration/api/api"
import { inputSecurity } from "@/security"
import { IError } from "@/features/FormRegistration/ui/FormRegistration"
import { useDispatch, useSelector } from "react-redux"
import { getActivated, getAuth, getWindow } from "@/shared/Form/ui/FormSlice"

const FormLogin = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<IError | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const Auth = useSelector((store: any) => store.FormSlice.Auth)
  const Activated = useSelector((store: any) => store.FormSlice.Activated)

  const dispatch = useDispatch()
  const [ErrorMessage, setErrorMessage] = useState("")
  const props = { email, password, setError, setEmail, setPassword, setStatus }
  const loginProps = { email, password, setEmail, setPassword }

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
      
      {Auth === 400 && <div className={style.error}>{ErrorMessage + " !"}</div>}

      <Button
        handleClick={async (e: any) => {
          const data = await handleSubmit(e, login(loginProps), props)
          if(data && data?.status === 200 
            && !data.data.user.isActivated
          ){
            alert('Активируйте аккаунт !')
          }
          if(data && data?.status === 200){
            dispatch(getWindow(false))
            dispatch(getActivated(data.data.user.isActivated))
          }
          if(data && data.status === 400){
            setErrorMessage(data.response.data.message)
          }
          data && dispatch(getAuth(data.status))
        }}
      >
        Войти
      </Button>
    </Form>
  )
}

export default FormLogin
