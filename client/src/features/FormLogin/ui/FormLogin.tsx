"use client"

import { useActionState, useEffect } from "react"
import style from "../../FormRegistration/ui/FormRegistration.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { useDispatch, useSelector } from "react-redux"
import {
  getActivated,
  getAuth,
  getUser,
  getWindow,
} from "@/shared/reducers/FormSlice"
import { loginFunction } from "../api/api"
import Spiner from "@/shared/ui/Spiner"
const FormLogin = () => {
  const [formState, formAction, isPending] = useActionState(loginFunction, null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (formState?.data) dispatch(getAuth(formState?.data.status))
    if (
      formState?.data &&
      formState?.data?.status === 200 &&
      !formState?.data.data.user.isActivated
    ) {
      alert("Активируйте аккаунт !")
    }
    if (formState?.data && formState?.data?.status === 200) {
      dispatch(getWindow(false))
      dispatch(getActivated(formState?.data.data.user.isActivated))
      dispatch(getUser(formState?.data.data.user))
      console.log(formState?.data.user)
    }
    if (formState?.data && formState?.data.status === 400) {
    }
    formState?.data && dispatch(getAuth(formState?.data.status))
  }, [formState])

  return (
    <Form formAction={formAction}>
      <input
        className={`${inputStyle.input} ${
          formState?.mailError && style.inputError
        }`}
        type="email"
        name="email"
        placeholder="Введите email"
        defaultValue={formState?.ErrorMessage ? formState?.email : ""}
      />
      <input
        className={`${inputStyle.input} ${
          formState?.pasError && style.inputError
        }`}
        type="password"
        name="password"
        placeholder="Введите пароль"
        defaultValue={formState?.ErrorMessage ? formState?.password : ""}
      />
      <div className={style.error}>{formState?.ErrorMessage}</div>

      <Button>{isPending ? <Spiner /> : "Войти"}</Button>
    </Form>
  )
}

export default FormLogin
