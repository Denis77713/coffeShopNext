"use client"

import ProductPayList from "@/widges/ProductPayList/ui/ProductPayList"
import { Suspense, use, useEffect, useMemo, useState } from "react"
import { getProductPay, redirectAction } from "../api/api"
import { api, apiServer } from "@/widges/header/api/api"
import UseLogin from "@/shared/Hookcs/UseLogin"
import { useSelector } from "react-redux"
import { getProcuctAccount } from "@/widges/AccountProductList/api/api"
import Skeleton from "@/shared/ui/Skeleton"
import style from "./Account.module.css"
import PathProductList from "@/widges/PathProductList/ui/PathProductList"
import AccountProductList from "@/widges/AccountProductList/ui/AccountProductList"
import axios from "axios"
import { TypeDevelop } from "@/shared/types/types"
//
//

const getData = async (url: string) => {
  if (typeof window !== "undefined") return await api.get(url)
}
const postData = async (url: string) => {
  if (typeof window !== "undefined") return await api.post(url)
}

const categoryPromise = getData("/users")
const dataPromise = getData("/product")
const grade = postData("/getGrade")

//
const Account = () => {
  type Icategory = {
    id: number
    name: string
    image: string
    page: string
  }
  const User = useSelector((store: any) => store.FormSlice.User)
  const [test, seTest] = useState([])
  const [prductPay, setPrductPay] = useState<TypeDevelop[] | null>(null)
  const host = process.env.NEXT_PUBLIC_HOST
  //
  //
  UseLogin()
  useEffect(() => {
    if (User !== "Unauthorized") {
      if (User.role !== "user") redirectAction(host)
    }
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
  return (
    <main>
      <>
        <h2 className={style.payTitle}>Товары в пути</h2>
        <Suspense fallback={skeleton}>
          {test.length === 0 && skeleton}
          <ProductPayList
            dataPromise={dataPromise}
            categoryPromise={categoryPromise}
            gradeStarPromise={grade}
            prductPay={prductPay}
            seTest={seTest}
          />
        </Suspense>
        {/* <h2 className={style.payTitle}>Доставленные товары</h2>
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
        </Suspense> */}
      </>
    </main>
  )
}

export default Account
