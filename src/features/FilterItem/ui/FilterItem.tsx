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
  const res = params.has(item.name)

  const [state, setstate] = useState(res)
  
  return (
    <div className={style.filterItem} key={item.id}>
      <input
        className={style.filterInner}
        type="checkbox"
        onChange={() => handleChange(item)}
        checked  = {state}
      />
      <p className={style.filterInner}>{item.text}</p>
      {!isNaN(Number(item.value)) && <p>{item.value}</p>}
    </div>
  )
  function handleChange(item: Filter) {
    const params = new URLSearchParams(searchParams)
    if (state === false) {
      params.set(item.name, item.value)
    } else {
      params.delete(item.name)
    }
    replace(`${pathName}?${params.toString()}`)
    setstate(!state)
  }
}

export default FilterItem
