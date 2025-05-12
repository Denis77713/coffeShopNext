"use server"

import { prisma } from "../../../../prisma/prisma-client"

export async function updateImage(img: string, id: number) {
  console.log(img, id)
  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      imageUrl: img,
    },
  })
}
