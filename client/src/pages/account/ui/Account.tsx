"use client"

import ProductPayList from "@/widges/ProductPayList/ui/ProductPayList"
import { Suspense, use, useEffect, useMemo, useState } from "react"
import { getProductPay, redirectAction } from "../api/api"
import { api } from "@/widges/header/api/api"
import { TypeGrade } from "@/shared/types/types"
import UseLogin from "@/shared/Hookcs/UseLogin"
import { useSelector } from "react-redux"
import { getProcuctAccount } from "@/widges/AccountProductList/api/api"
import Skeleton from "@/shared/ui/Skeleton"
import style from "./Account.module.css"
import PathProductList from "@/widges/PathProductList/ui/PathProductList"
import AccountProductList from "@/widges/AccountProductList/ui/AccountProductList"
//
//
export type TypeDevelop = {
  developId: string
  id: number
  name: string
  num: number
  productId: number
  status: string
  sum: number
  textStatus: string
  userId: number
}
type TypeprductPay = {
  successfulOrder: TypeDevelop[]
  received: TypeDevelop[]
  delivered: TypeDevelop[]
}

async function getProducts() {
  const res = await api.get("/users")
  return res
}
//
const Account = () => {
  type Icategory = {
    id: number
    name: string
    image: string
    page: string
  }
  const User = useSelector((store: any) => store.FormSlice.User)
  const [category, setCategory] = useState<Icategory[]>([])
  const [grade, setGrade] = useState<TypeGrade[]>([])
  const [prductPay, setPrductPay] = useState<TypeprductPay | null>(null)
  const host = process.env.NEXT_PUBLIC_HOST
  //
  UseLogin(getProducts, setCategory)
  const state = useMemo(() => getProcuctAccount(), [])

  useEffect(() => {
    async function func() {
      let result
      const data = await getProductPay(User.id)
      console.log(data)
      const successfulOrder: TypeDevelop[] = data.filter(
        (item) => item.status === "Успешный заказ"
      )
      const received: TypeDevelop[] = data.filter(
        (item) => item.status === "Получен"
      )
      const delivered: TypeDevelop[] = data.filter(
        (item) => item.status === "Delivered"
      )
      successfulOrder && setPrductPay({ successfulOrder, received, delivered })
    }
    func()
  }, [])
  //
  useEffect(() => {
    if (User !== "Unauthorized") {
      if (User.role !== "user") redirectAction(host)
    }
    async function Login() {
      try {
        const data = await api.post("/getGrade")
        setGrade(data.data)
      } catch {
        localStorage.removeItem("token")
      }
    }

    Login()
  }, [User])
  //
  const skeleton = (
    <Skeleton
      wrapper={style.wrapperSkeleton}
      inner={style.itemSkeleton}
      number={4}
    />
  )
  return (
    <main>
      <>
        <h2 className={style.payTitle}>Товары в пути</h2>
        <Suspense fallback={skeleton}>
          <ProductPayList
            promise={state}
            category={category}
            gradeStar={grade}
            prductPay={prductPay?.successfulOrder}
          />
        </Suspense>
        <h2 className={style.payTitle}>Доставленные товары</h2>
        <Suspense fallback={skeleton}>
          <PathProductList
            promise={state}
            category={category}
            gradeStar={grade}
            prductPay={prductPay?.received}
          />
        </Suspense>
        <h2 className={style.payTitle}>История заказов</h2>
        <Suspense fallback={skeleton}>
          <AccountProductList
            promise={state}
            category={category}
            gradeStar={grade}
            prductPay={prductPay?.delivered}
          />
        </Suspense>
      </>
    </main>
  )
}

export default Account
