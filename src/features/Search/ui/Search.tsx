"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import style from "./Search.module.css"
import { useState } from "react"
import { inputSecurity } from "@/security"

const Search = () => {
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  const [search, setSearch] = useState(searchParams.get("query")?.toString())
  console.log(search)

  return (
    <input
      className={style.input}
      type="text"
      value={search}
      onChange={(e) => {
        const result = inputSecurity(e.target.value)
        setSearch(result)
        handleChange(result)
      }}
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
