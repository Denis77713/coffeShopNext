"use client"

import { Star } from "@/entities/Product/ui/Product"
import { Item } from "@/entities/Product/ui/ProductType"
import { FC, useEffect } from "react"

const UseGetStar = (grade: Star[], setState: any, item: Item) => {
  const newGrade = grade.filter((inner: any) => item.id === inner.productId)
  useEffect(() => {
    const newGradeSum = newGrade.reduce(
      (acc: any, number: any) => acc + number.grade,
      0
    )
    const reStar =
      newGrade.length !== 0 ? Math.round(newGradeSum / newGrade.length) : 0
    setState(reStar)
  }, [newGrade])

  return null
}

export default UseGetStar
