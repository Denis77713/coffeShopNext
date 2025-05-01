"use client"

import { Item } from "@/entities/Product/ui/ProductType"
import { api } from "@/widges/header/api/api"
import { useEffect } from "react"

const UseGetGrade = (
  setGrade: any,
  dataList: Item[] | any,
  dataRender?: any
) => {
  useEffect(() => {
    async function Login() {
      try {
        const dataListId = dataList.map((item: Item) => item.id)
        const data = await api.post("/getGrade", { data: dataListId })
        console.log(data)
        setGrade(data.data)
      } catch {
        localStorage.removeItem("token")
      }
    }

    Login()
  }, [dataRender ? dataRender : dataList])

  return null
}

export default UseGetGrade
