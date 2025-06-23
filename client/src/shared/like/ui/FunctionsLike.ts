import { Iproduct } from "@/shared/types/types"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductListTypes"

export function handleclick(item: Iproduct, setState: any) {
  const jsonData: string | null = localStorage.getItem("like")
  let res
  if (jsonData !== null) {
    const arr: ItemStore[] = JSON.parse(jsonData)
    const filterArr = arr.filter((i) => i.id === item.id)
    if (filterArr.length === 0) {
      const newArr: any = item
      newArr.like = true
      setState(true)
      arr.push(newArr)
      localStorage.setItem("like", JSON.stringify(arr))
      res = arr
    } else {
      const filterArr2 = arr.filter((itemArr) => itemArr.id !== filterArr[0].id)
      filterArr[0].like = !filterArr[0].like
      setState(filterArr[0].like)
      filterArr2.push(filterArr[0])
      localStorage.setItem("like", JSON.stringify(filterArr2))
      res = filterArr2
    }
  } else {
    const newItem = item
    newItem.like = true
    setState(true)
    localStorage.setItem("like", JSON.stringify([newItem]))
    res = [newItem]
  }
  return res
}

export function getState(item: Iproduct) {
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
export function isLikeFilter(data: Iproduct[] | any) {
  const res = data.filter((item: Iproduct) => item.like === true)
  return res
}
