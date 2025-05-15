"use client"

import ProductPayItem from "@/entities/ProductPayItem/ui/ProductPayItem"
import { newDataManagerItem } from "@/shared/types/types"
import Button from "@/shared/ui/Button"
import { FC, useState } from "react"
import { getProductPay, updateProductPay } from "../api/api"

const ProductPayIList: FC<{ data: newDataManagerItem[] }> = ({ data }) => {
  const [state, setState] = useState<any>(data)
  console.log(state)
  return (
    <>
      {state.length === 0 && <h1>Нет товаров</h1>}
      <div>
        {state.length !== 0 &&
          state.map((item: any) => (
            <ProductPayItem
              key={item.id}
              item={item}
              state={state}
              setState={setState}
            />
          ))}
        <Button
          handleClick={async (e: any) => {
            await updateProductPay(state)
            const res = await getProductPay(state)
            setState(res)
          }}
        >
          Отправить
        </Button>
      </div>
    </>
  )
}

export default ProductPayIList
