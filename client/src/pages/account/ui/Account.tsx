"use client"

import AccountProductList from "../../../widges/AccountProductList/ui/AccountProductList"
import ProductPayList from "@/widges/ProductPayList/ui/ProductPayList"
import IsLogin from "@/shared/Hookcs/IsLogin"
import { useEffect, useState } from "react"
import { getCategoryes, getProductPay, redirectAction } from "../api/api"
import { api } from "@/widges/header/api/api"
import { TypeGrade, TypeProductPay } from "@/shared/types/types"
import PathProductList from "@/widges/PathProductList/ui/PathProductList"
import UseLogin from "@/shared/Hookcs/UseLogin"
import { useSelector } from "react-redux"
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
  //
  useEffect(() => {
    if (User.role !== "user") redirectAction(host)
    async function Login() {
      try {
        const data = await api.post("/getGrade")
        setGrade(data.data)
      } catch {
        localStorage.removeItem("token")
      }
    }

    Login()
  }, [category])
  //
  return (
    <main>
      {category.length !== 0 && (
        <>
          <ProductPayList category={category} gradeStar={grade} />
          <PathProductList category={category} gradeStar={grade} />
          <AccountProductList category={category} gradeStar={grade} />
        </>
      )}
    </main>
  )
}

export default Account
