import { Item } from "@/entities/Product/ui/ProductType"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductListTypes"

export function handleclick(item: Item) {
  const jsonData: string | null = localStorage.getItem("like")
  if (jsonData !== null) {
    const arr: ItemStore[] = JSON.parse(jsonData)
    const filterArr = arr.filter((i) => i.id === item.id)
    if (filterArr.length === 0) {
      const newArr:any = item
      newArr.like = true
      arr.push(newArr)
      localStorage.setItem("like", JSON.stringify(arr))
      // console.log(arr)
    } else {
      filterArr[0].like = !filterArr[0].like
      arr.splice(filterArr[0].id - 1, 1, filterArr[0])
      // console.log(arr)
      localStorage.setItem("like", JSON.stringify(arr))
    }
  } else {
    const newItem = item
    newItem.like = true
    localStorage.setItem("like", JSON.stringify([newItem]))
  }
}
