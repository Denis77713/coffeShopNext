"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import style from "./Search.module.css"


const Search = () => {
  const searchParams:any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  return (
    <input
      className={style.input}
      type="text"
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Поиск по сайту"
    />
  )
  function handleChange(value: string): void {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("query", value)
    } else {
      params.delete("query")
    }
    replace(`${pathName}?${params.toString()}`)
  }
}

export default Search
