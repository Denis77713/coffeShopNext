import { Item } from "@/entities/Product/ui/ProductType"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductListTypes"

export function handleclick(item: Item,setState:any) {
  const jsonData: string | null = localStorage.getItem("like")
  if (jsonData !== null) {
    const arr: ItemStore[] = JSON.parse(jsonData)
    const filterArr = arr.filter((i) => i.id === item.id)
    if (filterArr.length === 0) {
      const newArr:any = item
      newArr.like = true
      setState(true)
      arr.push(newArr)
      localStorage.setItem("like", JSON.stringify(arr))
      // console.log(arr)
    } else {
      // console.log(arr)
      const filterArr2 = arr.filter(itemArr=> itemArr.id !== filterArr[0].id)
      filterArr[0].like = !filterArr[0].like
      setState(filterArr[0].like)
      filterArr2.push(filterArr[0])
      localStorage.setItem("like", JSON.stringify(filterArr2))
    }
  } else {
    const newItem = item
    newItem.like = true
    setState(true)
    localStorage.setItem("like", JSON.stringify([newItem]))
  }
}


export function getState(item:Item) {
  let result: boolean | undefined = false
  if (typeof window !== "undefined") {
    const jsonData: string | null = localStorage.getItem("like")
    if (jsonData !== null) {
      const arr: ItemStore[] = JSON.parse(jsonData)
      const filterArr = arr.filter((i) => i.id === item.id)
      if (filterArr.length !== 0) result = filterArr[0].like
    }
  }
  return result
}