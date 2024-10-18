'use server'

import { prisma } from "../../../../prisma/prisma-client"

export async function createProduct(weight:number,best:string,inputName:string,inputNum:string) {
  const drip = weight === 10?'true':'false'
   await prisma.product.create({
    data: {
      name: inputName,
      imageUrl: "variant2",
      price: inputNum,
      best: best,
      weight: String(weight),
      none: "false",
      drip: drip,
      categoryId: 1,
    },
  })
}