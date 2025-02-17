import { api } from "@/widges/header/api/api"
import { IProductCart } from "../ui/CartForm"

export async function getCartPay(e: any, dataStorage: IProductCart[]) {
  e.preventDefault()
  try {
    const res = await api.post("/getCartPay", dataStorage)
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}
