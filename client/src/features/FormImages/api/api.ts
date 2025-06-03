"use server"

import { prisma } from "../../../../prisma/prisma-client"

export async function updateImage(img: string, id: number) {
  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      imageUrl: img,
    },
  })
}
