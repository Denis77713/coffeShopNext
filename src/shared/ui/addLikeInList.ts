import { Item } from "@/entities/Product/ui/Product"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductList"

export function addLikeInList(dataList: Item[], count: ItemStore[]) {
  dataList.forEach((item, index) => {
    if (count[index]) {
      if (item.id === count[index].id) {
        item.like = count[index].like
      }
    }
  })
}
