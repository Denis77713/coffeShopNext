import { ItemStore } from "@/widges/BestProductList/ui/BestProductListTypes"

export function addLikeInList(dataList: any, count: ItemStore[]) {
  dataList.forEach((item: any, index: any) => {
    if (count[index]) {
      if (item.id === count[index].id) {
        item.like = count[index].like
      }
    }
  })
}
