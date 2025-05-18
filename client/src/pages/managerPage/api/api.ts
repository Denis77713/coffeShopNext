"use server"

import {
  Iproduct,
  newDataManagerItem,
  TypeProductPay,
} from "@/shared/types/types"
import { prisma } from "../../../../prisma/prisma-client"

export async function getProductPay(params: any) {
  //
  const data = params
  if (data.id) data.id = Number(data.id)
  if (data.productId) data.productId = Number(data.productId)

  const productPayArr: TypeProductPay[] = await prisma.productPay.findMany({
    where: {
      ...params,
    },
  })
  const productIdArr: number[] = productPayArr.map((item) => item.productId)
  const productDataArr: Iproduct[] = await prisma.product.findMany({
    where: {
      id: { in: productIdArr },
    },
  })
  let result: newDataManagerItem[] = []

  productPayArr.forEach((item: TypeProductPay) => {
    productDataArr.forEach((inner: Iproduct) => {
      if (inner.id === item.productId)
        result.push({ ...item, imageUrl: inner.imageUrl, text: inner.name })
    })
  })
  return result
}
