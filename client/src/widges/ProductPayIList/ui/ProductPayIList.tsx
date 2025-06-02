"use client"

import ProductPayItem from "@/entities/ProductPayItem/ui/ProductPayItem"
import { newDataManagerItem } from "@/shared/types/types"
import Button from "@/shared/ui/Button"
import { FC, useEffect, useState } from "react"
import { getProductPay, updateProductPay } from "../api/api"
import UseLogin from "@/shared/Hookcs/UseLogin"
import { useSelector } from "react-redux"
import titleStyle from "@/shared/ui/Title.module.css"
import style from "./ProductPayIList.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const ProductPayIList: FC<{ data: newDataManagerItem[] }> = ({ data }) => {
  const User = useSelector((store: any) => store.FormSlice.User)

  const [state, setState] = useState<any>(
    data.filter((i: newDataManagerItem) => i.status === "Delivered")
  )
  const [boolean, setBoolean] = useState<any>(false)
  console.log(state)
  UseLogin()
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    User.role === "sklad" &&
      setState(data.filter((i: newDataManagerItem) => i.status !== "Delivered"))
    User.role === "manager" &&
      setState(data.filter((i: newDataManagerItem) => i.status !== "Получен"))
  }, [data, boolean])
  return (
    <>
      {User.role === "sklad" && (
        <h1 className={`${titleStyle.title} ${style.title}`}>Склад</h1>
      )}
      {User.role === "manager" && (
        <h1 className={`${titleStyle.title} ${style.title}`}>Менеджер</h1>
      )}
      <div className={style.mb}>
        <Button
          handleClick={() => {
            const params = new URLSearchParams(searchParams)
            const developId = params.get("developId")
            replace(`${pathName}?developId=${developId}`)
          }}
        >
          Показать все товары заказа
        </Button>
      </div>
      {state.length === 0 && <h1>Нет товаров</h1>}
      <div>
        {state.length !== 0 &&
          state.map((item: any) => (
            <ProductPayItem
              key={item.id}
              item={item}
              state={state}
              setState={setState}
            />
          ))}
        <Button
          handleClick={async (e: any) => {
            await updateProductPay(state)
            setBoolean(!boolean)
          }}
        >
          Отправить
        </Button>
      </div>
    </>
  )
}

export default ProductPayIList
