"use client"

import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { useDispatch } from "react-redux"
import { getWindow } from "@/shared/reducers/FormSlice"
import style from "./FormAccount.module.css"

const FormAccount = () => {
  const dispatch = useDispatch()

  return (
    <Form>
      <div className={style.wrapperForm}>
        <Button handleClick={() => dispatch(getWindow("login"))}>Логин</Button>
        {/* <div className={style.div}></div> */}
        <Button handleClick={() => dispatch(getWindow("registrarion"))}>
          Регистрация
        </Button>
      </div>
    </Form>
  )
}

export default FormAccount
