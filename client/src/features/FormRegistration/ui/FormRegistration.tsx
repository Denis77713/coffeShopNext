"use client"

import { useRef, useState } from "react"
import FormAddProduct from "../../../widges/FormAddProduct/ui/FormAddProduct.module.css"
import style from "./FormRegistration.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import Button from "@/shared/ui/Button"
import Image from "next/image"
import { handleSubmit } from "../api/api"

interface IError {
  text: string
  emali?: boolean
  password?: boolean
  activated?: boolean
}

const Form = ({setPage}:any) => {
  const ref = useRef<any>()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<IError | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const props = { email, password, setError, setEmail, setPassword, setStatus }

  return (
    <div className={style.wrapper}>
      <Image
        className={`${FormAddProduct.close} ${style.zindex}`}
        src={"/close.svg"}
        alt="close"
        width={30}
        height={30}
        onClick={() => setPage(null)}
      />
      <form
        ref={ref}
        id="formData"
        className={FormAddProduct.formProduct}
        onSubmit={(e) => handleSubmit(e, props)}
      >
        <input
          className={`${inputStyle.input} ${error?.emali && style.inputError}`}
          type="email"
          name="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={`${inputStyle.input} ${
            error?.password && style.inputError
          }`}
          type="password"
          name="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={style.error}>{error?.text}</div>
        {status && <div className={style.status}>{status}</div>}

        <Button>Регистрация</Button>
      </form>
    </div>
  )
}

export default Form
