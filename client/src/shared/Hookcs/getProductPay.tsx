import { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { getProductPay } from "@/pages/account/api/api"
import { Iproduct } from "../types/types"

const GetProductPay = (
  setProductPay: any,
  status: string,
  productList: Iproduct[] | any
) => {
  const User = useSelector((store: any) => store.FormSlice.User)
  //
  //
  const ListId = productList?.map((item: any) => item.id)
  //
  //
  useEffect(() => {
    async function func() {
      const data = await getProductPay(status, User.id, ListId)
      setProductPay(data)
    }
    func()
  }, [])
  return null
}

export default GetProductPay
