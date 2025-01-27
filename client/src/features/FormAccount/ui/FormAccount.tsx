"use client"

import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { useDispatch } from "react-redux"
import { getWindow } from "@/shared/Form/ui/FormSlice"

const FormAccount = () => {
  const dispatch = useDispatch()

  return (
        <Form>
          <Button handleClick={() => dispatch(getWindow("login"))}>
            Логин
          </Button>
          <Button handleClick={() => dispatch(getWindow("registrarion"))}>
            Регистрация
          </Button>
        </Form>
  )
}

export default FormAccount
