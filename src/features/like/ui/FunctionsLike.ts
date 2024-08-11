import { IntProductItems } from "@/entities/Product/ui/Product"
import { IntStorageData } from "./Like"

export function handleclick(
  item: IntProductItems,
  list: IntProductItems[],
  state: boolean,
  setState: any
): void {
  const data = localStorage.getItem("like")
  if (data !== null) {
    const arr = JSON.parse(data)
    getLocalStorageData(arr, item)
  } else {
    const arr = list.map((i) => {
      const result = { id: i.id, like: false }
      return result
    })
    getLocalStorageData(arr, item)
  }
  setState(!state)
}

export function getLocalStorageData(
  arr: IntStorageData[],
  item: IntProductItems
): void {
  const newValue = arr.find((value: any) => value.id === item.id)

  if (typeof newValue !== "undefined") {
    newValue.like = !newValue.like
    const newArr = arr.filter((value: any) => value.id !== item.id)
    newArr.push(newValue)
    localStorage.setItem("like", JSON.stringify(newArr))
  }
}
