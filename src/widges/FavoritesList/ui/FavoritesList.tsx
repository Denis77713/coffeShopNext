"use client"

import Product, { IntProductItems } from "@/entities/Product/ui/Product"
import { useEffect, useState } from "react"

const FavoritesList = () => {
  const [state, setstate] = useState<IntProductItems[]>([])
  const [boolean, setBoolean] = useState(false)

  useEffect(() => {
    const storageJson = localStorage.getItem("like")

    if (storageJson) {
      const storageData: IntProductItems[] = JSON.parse(storageJson)
      const ArrIdIsLikeTrue: IntProductItems[] = storageData.filter(
        (item) => item.like === true
      )
      setstate(ArrIdIsLikeTrue)
    }
  }, [boolean])

  return (
    <div onClick={() => setBoolean(!boolean)}>
      {state.map((item) => (
        <Product key={item.id} item={item} list={state} />
      ))}
    </div>
  )
}

export default FavoritesList
