"use client"

import Image from "next/image"
import { useRef } from "react"
import style from "./Form.module.css"
import { useDispatch } from "react-redux"
import { getWindow } from "./FormSlice"

type IForm = {
  children: React.ReactNode
}

const Form = ({ children }: IForm) => {
  const ref = useRef<any>()
  const dispatch = useDispatch()

  return (
    <div className={`${style.wrapper}`}>
      <Image
        className={`${style.close}`}
        src={"/close.svg"}
        alt="close"
        width={30}
        height={30}
        onClick={()=>dispatch(getWindow(false))}
      />
      <form
        ref={ref}
        id="formData"
        className={style.formProduct}
        
      >
        {children}
      </form>
    </div>
  )
}

export default Form
