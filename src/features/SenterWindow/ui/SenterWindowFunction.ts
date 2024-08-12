import { IntProductItems } from "@/entities/Product/ui/Product"
import { IntStorageData } from "@/features/like/ui/Like"

export function getDataFilter(
  data: IntStorageData[],
  dataList: IntProductItems[]
) {
  const filterData = data.filter((item) => item.like === true)
  const result: any[] = []
  filterData.forEach((item) => {
    dataList.forEach((inner) => {
      if (inner.id === item.id) result.push(inner)
    })
  })
  return result
}
