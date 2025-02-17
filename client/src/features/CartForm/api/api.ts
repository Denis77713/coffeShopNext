import { api } from "@/widges/header/api/api"
import { IProductCart } from "../ui/CartForm"

export async function getCartPay(
  e: any,
  dataStorage: IProductCart[],
  sum: number,
  setComplitePay: any
) {
  e.preventDefault()
  try {
    const res = await api.post("/getCartPay", { data: dataStorage, sum: sum })
    setComplitePay(res.status)
  } catch (e) {
    console.log(e)
  }
}
