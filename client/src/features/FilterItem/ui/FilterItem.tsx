"use client"

import { FC, useState } from "react"
import style from "./FilterItem.module.css"
import { Filter } from "@/widges/FilterList/ui/FilterList"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const FilterItem: FC<{ item: Filter }> = ({ item }) => {
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  const [state, setState] = useState(false)
  
  return (
    <div className={style.filterItem} key={item.id}>
      <input
        className={style.filterInner}
        type="checkbox"
        onChange={() => handleChange(item)}
        checked={item.value === params.get(item.name)}
      />
      <p className={style.filterInner}>{item.text}</p>
      {!isNaN(Number(item.value)) && <p>{item.value}</p>}
    </div>
  )
  function handleChange(item: Filter) {
    const params = new URLSearchParams(searchParams)
    if (item.value === params.get(item.name)) {
      params.delete(item.name)
    } else {
      params.set(item.name, item.value)
    }
    replace(`${pathName}?${params.toString()}`)
    setState(!state)

  }
}

export default FilterItem
