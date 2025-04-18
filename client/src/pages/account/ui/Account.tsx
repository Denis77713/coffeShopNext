"use client"

import AccountProductList from "../../../widges/AccountProductList/ui/AccountProductList"
import ProductPayList from "@/widges/ProductPayList/ui/ProductPayList"
import IsLogin from "@/shared/Hookcs/IsLogin"
import { useState } from "react"
import { getCategoryes } from "../api/api"

const Account = () => {
  type Icategory = {
    id: number
    name: string
    image: string
    page: string
  }

  const [category, setCategory] = useState<Icategory[]>([])

  IsLogin(setCategory, getCategoryes)
  return (
    <>
      {category.length !== 0 && (
        <>
          <ProductPayList category={category} />
          <AccountProductList category={category} />
        </>
      )}
    </>
  )
}

export default Account
