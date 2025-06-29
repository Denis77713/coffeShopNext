"use client"

import ProductPayList from "@/widges/ProductPayList/ui/ProductPayList"
import IsLogin from "@/shared/Hookcs/IsLogin"
import { Suspense, use, useEffect, useState } from "react"
import { redirectAction } from "../api/api"
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
  const host = process.env.NEXT_PUBLIC_HOST
  //
  UseLogin(getProducts, setCategory)
  const [state, setState] = useState(getProcuctAccount)

  IsLogin(setState, getProcuctAccount)
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
  console.log(state)
  return (
    <main>
      {category.length !== 0 && (
        <>
          <h2 className={style.payTitle}>Товары в пути</h2>
          <Suspense fallback={skeleton}>
            <ProductPayList
              promise={state}
              category={category}
              gradeStar={grade}
            />
          </Suspense>
          <h2 className={style.payTitle}>Доставленные товары</h2>
          <Suspense fallback={skeleton}>
            <PathProductList
              promise={state}
              category={category}
              gradeStar={grade}
            />
          </Suspense>
          <h2 className={style.payTitle}>История заказов</h2>
          <Suspense fallback={skeleton}>
            <AccountProductList
              promise={state}
              category={category}
              gradeStar={grade}
            />
          </Suspense>
        </>
      )}
    </main>
  )
}

export default Account
