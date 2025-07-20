"use client"

import { useActionState, useMemo, useState } from "react"
import style from "./FormRegistration.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { inputSecurity } from "@/security"
import { getAuth } from "@/shared/reducers/FormSlice"
import { useDispatch } from "react-redux"
import { getData, registration } from "../api/api"
import Spiner from "@/shared/ui/Spiner"

export interface IError {
  text: string
  emali?: boolean
  password?: boolean
  activated?: boolean
  name?: boolean
  lastName?: boolean
}

const FormRegistration = () => {
  const [error, setError] = useState<IError | null>({ text: "" })
  const [status, setStatus] = useState<string | null>(null)

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   async function reistr() {
  //     if (error === null) {
  //       const data: any = await registration(
  //         registrarionProps,
  //         setLoad,
  //         setError
  //       )
  //       data && dispatch(getAuth(data.status))
  //     }
  //   }
  //   reistr()
  // }, [error])

  const [result, formAction, isPending] = useActionState(registration, null)
  const data = getData(result)
  return (
    <Form formAction={formAction}>
      {data.map((item) => (
        <input
          key={item.name}
          className={`${inputStyle.input} ${
            item.styleError && style.inputError
          }`}
          defaultValue={item.value}
          type={item.type}
          name={item.name}
          placeholder={item.placeholder}
          disabled={isPending}
        />
      ))}

      <div className={style.error}>{error?.text}</div>
      {status && <div className={style.status}>{status}</div>}
      <div className={style.error}>{result?.error}</div>
      {result?.message && (
        <a href={`mailto:${result.message}`}>
          <div>Подтвердите почту по ссылке {result.message}</div>
        </a>
      )}
      <Button>{isPending ? <Spiner /> : "Регистрация"}</Button>
    </Form>
  )
}

export default FormRegistration
