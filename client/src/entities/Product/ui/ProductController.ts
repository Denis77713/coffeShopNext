import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import { Item } from "./ProductType"

export function addCookie(item: number) {
  document.cookie = "cookieName=number; Max-Age=-1;"
  document.cookie = `number=${item}`
}

export function getPageCategory(item: Item,category: TypeCategory[],pathname: string | null) : string {
  const filterCategory = category.filter(
    (inner) => inner.id === item.categoryId
  )

  const resultCategory = filterCategory[0].page
  const result = resultCategory.replace("/", "")
  let url = ""
  
  if (pathname === "/" || pathname === "/favorites") {
    url = `products/${result}/${item.name}`
  } else {
    url = `${result}/${item.name}`
  }
  return url
}