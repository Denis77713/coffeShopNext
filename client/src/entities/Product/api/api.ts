import { Iproduct } from "@/shared/types/types"
import { Item } from "../ui/ProductType"

export function addProductCard(item: Iproduct) {
  const cart = localStorage.getItem("cart")
  if (cart) {
    localStorage.removeItem("cart")
    const newCart = JSON.parse(cart)
    const newArr = [...newCart, item]
    const result = newArr.reduce((o, i) => {
      if (!o.find((v: Item) => v.id == i.id)) {
        o.push(i)
      }
      return o
    }, [])
    localStorage.setItem("cart", JSON.stringify(result))
  } else {
    localStorage.setItem("cart", JSON.stringify([item]))
  }
}
