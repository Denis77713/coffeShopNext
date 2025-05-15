"use server"

import {
  Iproduct,
  newDataManagerItem,
  TypeProductPay,
} from "@/shared/types/types"
import { prisma } from "../../../../prisma/prisma-client"

export async function getProductPay(params: any) {
  //
  const id = params.id
  const productPayArr: TypeProductPay[] = await prisma.productPay.findMany({
    where: {
      // status: "Delivered",
      ...params,
      id: id && Number(id),
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
