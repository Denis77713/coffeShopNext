import { Item } from "@/entities/Product/ui/ProductType"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductListTypes"

export function addLikeInList(dataList: Item[], count: ItemStore[]) {
  dataList.forEach((item, index) => {
    if (count[index]) {
      if (item.id === count[index].id) {
        item.like = count[index].like
      }
    }
  })
}
