"use client"

import { Item } from "@/entities/Product/ui/ProductType"
import { api } from "@/widges/header/api/api"
import { useEffect } from "react"

const UseGetGrade = (
  setGrade: any,
  dataList: Item[] | any,
  render?: boolean
) => {
  useEffect(() => {
    async function Login() {
      try {
        const dataListId = dataList.map((item: Item) => item.id)
        const data = await api.post("/getGrade", { data: dataListId })
        setGrade(data.data)
      } catch {
        localStorage.removeItem("token")
      }
    }

    Login()
  }, [render && dataList])

  return null
}

export default UseGetGrade
