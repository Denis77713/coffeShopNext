"use server"

import { redirect } from "next/navigation"
import { prisma } from "../../../../prisma/prisma-client"
import { api } from "@/widges/header/api/api"

export async function redirectAction(path: any) {
  redirect(path)
}
export const getCategoryes = async () => {
  const result = await prisma.category.findMany()
  return result
}
export const getProductPay = async (id: number) => {
  const result = await prisma.productPay.findMany({
    where: {
      userId: id,
    },
  })
  return result
}
