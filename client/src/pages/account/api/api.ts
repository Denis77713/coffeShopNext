"use server"

import { redirect } from "next/navigation"
import { prisma } from "../../../../prisma/prisma-client"

export async function redirectAction(path: string) {
  redirect(path)
}
export const getCategoryes = async () => {
  const result = await prisma.category.findMany()
  return result
}
export const getProductPay = async (
  status: string,
  id: number,
  ListId: number[]
) => {
  const result = await prisma.productPay.findMany({
    where: {
      userId: id,
      status: status,
      productId: { in: ListId },
    },
  })
  return result
}
