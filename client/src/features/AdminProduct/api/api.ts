"use server"

import { Iproduct } from "@/shared/types/types"
import { prisma } from "../../../../prisma/prisma-client"

export async function updateProduct(id: number, name: string, price: string) {
  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      price: price,
    },
  })
}
export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: {
      id: id,
    },
  })
}
export async function deleteGrade(id: number) {
  await prisma.gradeStar.deleteMany({
    where: {
      productId: id,
    },
  })
}
