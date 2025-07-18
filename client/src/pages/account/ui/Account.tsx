"use client"

import ProductPayList from "@/widges/ProductPayList/ui/ProductPayList"
import {
  Suspense,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"
import { getProductPay, redirectAction } from "../api/api"
import { api } from "@/widges/header/api/api"
import UseLogin from "@/shared/Hookcs/UseLogin"
import { useSelector } from "react-redux"
import Skeleton from "@/shared/ui/Skeleton"
import style from "./Account.module.css"
import { ListProductPay, TypeDevelop } from "@/shared/types/types"
import PathProductList from "@/widges/PathProductList/ui/PathProductList"
import AccountProductList from "@/widges/AccountProductList/ui/AccountProductList"
import IsLogin from "./../../../shared/Hookcs/IsLogin"
//
//
const getData = async (url: string, islogin: boolean) => {
  if (typeof window !== "undefined" && islogin) return await api.get(url)
}
const postData = async (url: string, islogin: boolean) => {
  if (typeof window !== "undefined" && islogin) return await api.post(url)
}
const Auth = async () => {
  return { data: true }
}
//
//
//
//
const Account = () => {
  const host = process.env.NEXT_PUBLIC_HOST
  const User = useSelector((store: any) => store.FormSlice.User)
  const [test, seTest] = useState<null | ListProductPay>(null)
  const [prductPay, setPrductPay] = useState<TypeDevelop[] | null>(null)
  const [IsLogin, setIslogin] = useState(false)
  //
  //
  UseLogin(Auth, setIslogin, "user")
  //
  //
  const categoryPromise = useCallback<any>(getData("/users", IsLogin), [
    IsLogin,
  ])
  const dataPromise = useCallback<any>(getData("/product", IsLogin), [IsLogin])
  const gradeStarPromise = useCallback<any>(postData("/getGrade", IsLogin), [
    IsLogin,
  ])
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
