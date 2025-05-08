"use client"

import { Item } from "@/entities/Product/ui/ProductType"
import { FC, useEffect } from "react"
import { Iproduct, Star } from "../types/types"

const UseGetStar = (grade: Star[], setState: any, item: Item | Iproduct) => {
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
