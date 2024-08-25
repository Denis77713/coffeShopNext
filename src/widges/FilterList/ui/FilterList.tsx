import { FC } from "react"
import style from "./FilterList.module.css"

export type Filter = {
  id: number
  name: string
  value: string
  text: string
  filterId: number
}

const FilterList: FC<{ filters: Filter[] }> = ({ filters }) => {
  return <>
  </>
}

export default FilterList
