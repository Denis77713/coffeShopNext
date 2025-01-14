import { FC } from "react"
import FilterItem from "@/features/FilterItem/ui/FilterItem"

export type Filter = {
  id: number
  name: string
  value: string
  text: string
  filterId: number
}

const FilterList: FC<{ filters: Filter[] }> = ({ filters }) => {
  return filters.map((item) => (
  <FilterItem key={item.id} item = {item}/>
  ))

}

export default FilterList
