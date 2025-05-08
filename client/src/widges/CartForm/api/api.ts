import { IProductCart } from "@/shared/types/types"
import { api } from "@/widges/header/api/api"

export async function getCartPay(
  e: any,
  dataStorage: IProductCart[],
  sum: number,
  setComplitePay: any
) {
  e.preventDefault()
  try {
    const res = await api.post("/getCartPay", { data: dataStorage, sum: sum })
    console.log(res)
    setComplitePay(res.status)
  } catch (e) {}
}
