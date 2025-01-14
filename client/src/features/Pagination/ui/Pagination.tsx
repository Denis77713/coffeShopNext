"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ResponsivePagination from "react-responsive-pagination"
import "react-responsive-pagination/themes/classic.css"

const Pagination = (numProduct: any) => {
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  const [page, setPage] = useState(searchParams.get("page")?.toString())

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(numProduct.numProduct)

  useEffect(() => {
    setPage(currentPage)
    handleClick(currentPage)
  }, [currentPage])

  return (
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
  )
  function handleClick(value: any) {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("page", value)
    } else {
      params.delete("page")
    }
    replace(`${pathName}?${params.toString()}`)
  }
}

export default Pagination
