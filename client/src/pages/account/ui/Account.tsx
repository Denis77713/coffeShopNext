"use client"

import ProductPayList from "@/widges/ProductPayList/ui/ProductPayList"
import { Suspense, useLayoutEffect, useState } from "react"
import { getProductPay } from "../api/api"
import { api } from "@/widges/header/api/api"
import UseLogin from "@/shared/Hookcs/UseLogin"
import { useSelector } from "react-redux"
import Skeleton from "@/shared/ui/Skeleton"
import style from "./Account.module.css"
import { ListProductPay, TypeDevelop } from "@/shared/types/types"
import PathProductList from "@/widges/PathProductList/ui/PathProductList"
import AccountProductList from "@/widges/AccountProductList/ui/AccountProductList"
//
//
const getData = async (url: string) => {
  if (typeof window !== "undefined") return api.get(url).catch((e) => e)
}
const postData = async (url: string) => {
  if (typeof window !== "undefined") return api.post(url).catch((e) => e)
}
//
//
const categoryPromise = getData("/users")
const dataPromise = getData("/product")
const gradeStarPromise = postData("/getGrade")
//
//
const Account = () => {
  const User = useSelector((store: any) => store.FormSlice.User)
  const [test, seTest] = useState<null | ListProductPay>(null)
  const [prductPay, setPrductPay] = useState<TypeDevelop[] | null>(null)
  //
  UseLogin(null, null, "user")
  //
  //
  useLayoutEffect(() => {
    async function func() {
      try {
        const data = await getProductPay(User.id)
        setPrductPay(data)
      } catch {
        localStorage.removeItem("token")
      }
    }
    func()
  }, [])
  //
  //
  const skeleton = (
    <Skeleton
      wrapper={style.wrapperSkeleton}
      inner={style.itemSkeleton}
      number={4}
    />
  )
  const prop = {
    dataPromise,
    categoryPromise,
    gradeStarPromise,
    prductPay,
    seTest,
    test,
  }
  const result = [
    { component: ProductPayList, title: "Товары в пути" },
    { component: PathProductList, title: "Доставленные товары" },
    { component: AccountProductList, title: "История заказов" },
  ]
  return (
    <main>
      {result.map((item) => (
        <div key={item.title}>
          <h2 className={style.payTitle}>{item.title}</h2>
          <Suspense fallback={skeleton}>
            {!test && skeleton}
            <item.component prop={prop} />
          </Suspense>
        </div>
      ))}
    </main>
  )
}

export default Account
