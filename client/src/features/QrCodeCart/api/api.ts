"use server"

import { prisma } from "../../../../prisma/prisma-client"

export async function getProductPay(id: number) {
  const result = await prisma.productPay.findMany({
    where: {
      userId: id,
      status: "Delivered",
    },
  })
  return result
}
