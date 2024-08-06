import { prisma } from "../prisma-client"

export default async function generateCategory() {
  await prisma.category.createMany({
    data: [
      {
        name: "Кофе",
        image: "coffe",
        page:"/coffe"
      },
      {
        name: "Чай",
        image: "tea",
        page:"/tea"
      },
      {
        name: "Сладости",
        image: "sweets",
        page:"/sweets"
      },
      {
        name: "Аксессуары",
        image: "accessories",
        page:"/accessories"
      },
    ],
  })
}
