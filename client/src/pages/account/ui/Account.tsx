"use client"

import AccountProductList from "../../../widges/AccountProductList/ui/AccountProductList"
import ProductPayList from "@/widges/ProductPayList/ui/ProductPayList"
import IsLogin from "@/shared/Hookcs/IsLogin"
import { useEffect, useState } from "react"
import { getCategoryes } from "../api/api"
import { api } from "@/widges/header/api/api"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Account = () => {
  type Icategory = {
    id: number
    name: string
    image: string
    page: string
  }
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  const [category, setCategory] = useState<Icategory[]>([])
  const [grade, setGrade] = useState<any>([])

  IsLogin(setCategory, getCategoryes)
  console.log(searchParams)
  useEffect(() => {
    async function Login() {
      try {
        const data = await api.post("/getGrade")
        setGrade(data)
      } catch {
        localStorage.removeItem("token")
      }
    }

    Login()
  }, [category])

  return (
    <main>
      {category.length !== 0 && (
        <>
          <ProductPayList category={category} gradeStar={grade.data} />
          <AccountProductList category={category} gradeStar={grade.data} />
        </>
      )}
    </main>
  )
}

export default Account
