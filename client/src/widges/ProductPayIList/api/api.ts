"use server"

import { newDataManagerItem } from "@/shared/types/types"
import { prisma } from "../../../../prisma/prisma-client"

export async function updateProductPay(data: newDataManagerItem[]) {
  await data.forEach(
    async (item) =>
      await prisma.productPay.update({
        where: {
          id: item.id,
        },
        data: {
          status: item.status,
        },
      })
  )
}
export async function getProductPay(data: newDataManagerItem[]) {
  const res = await prisma.productPay.findMany({
    where: {
      developId: data[0].developId,
      status: "Delivered",
    },
  })
  return res
}
