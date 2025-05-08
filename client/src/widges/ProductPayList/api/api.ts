"use server"

import { prisma } from "../../../../prisma/prisma-client"

async function getNumProduct() {
  const result = await prisma.productPay.findMany()
}
