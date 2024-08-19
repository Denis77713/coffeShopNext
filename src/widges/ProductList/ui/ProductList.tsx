"use client"

import Product from "@/entities/Product/ui/Product"
import { getLike } from "@/features/likeGroup/ui/SlicelikeGroup"
import { IntStorageData } from "@/shared/like/ui/Like"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"



const ProductList = ({ res }) => {
  const dispatch = useDispatch()
  const [count, setCount] = useState<any>(true)
  const [state, setState] = useState<boolean>(false)

  useEffect(() => {
    const savedValue = window.localStorage.getItem(`like`)
    if (savedValue) {
      setCount(
        JSON.parse(savedValue).sort((a: IntStorageData, b: IntStorageData) =>
          a.id > b.id ? 1 : -1
        )
      )
      dispatch(
        getLike(
          JSON.parse(savedValue).sort((a: IntStorageData, b: IntStorageData) =>
            a.id > b.id ? 1 : -1
          )
        )
      )
    }
  }, [state])
  res.forEach((item, index) => {
    if (count[index]) {
      if (item.id === count[index].id) {
        item.like = count[index].like
      }
    }
  })
  return (
    <div onClick={()=>setState(!state)}>
      {res.map((item) => (
        <Product key={item.id} item={item} list={res} storage={count}/>
      ))}
    </div>
  )
}

export default ProductList
