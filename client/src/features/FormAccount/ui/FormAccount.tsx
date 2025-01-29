"use client"

import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { useDispatch } from "react-redux"
import { getWindow } from "@/shared/Form/ui/FormSlice"
import style from './FormAccount.module.css'

const FormAccount = () => {
  const dispatch = useDispatch()

  return (
        <Form>
          <Button handleClick={() => dispatch(getWindow("login"))}>
            Логин
          </Button>
          <div className={style.div}></div>
          <Button handleClick={() => dispatch(getWindow("registrarion"))}>
            Регистрация
          </Button>
        </Form>
  )
}

export default FormAccount
