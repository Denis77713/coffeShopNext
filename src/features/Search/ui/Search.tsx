"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import style from "./Search.module.css"
import { useState } from "react"
import { inputSecurity } from "@/security"
import { useDebouncedCallback } from "use-debounce"

const Search = () => {
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  const [search, setSearch] = useState(searchParams.get("query")?.toString())
  const debounced = useDebouncedCallback(handleChange, 500)
  return (
    <input
      className={style.input}
      type="text"
      value={search}
      onChange={(e) => {
        const result = inputSecurity(e.target.value)
        setSearch(result)
        // handleChange(result)
        debounced(result)
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
