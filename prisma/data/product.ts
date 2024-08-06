import { prisma } from "../prisma-client"

export default async function generateProduct() {
  await prisma.product.createMany({
    data: [
      {
        name: "123",
        imageUrl: "123",
        price: 250,
        weight: 200,
        best: false,
        categoryId: 1,
      },
    ],
  })
}
