import { prisma } from "../prisma-client"

export default async function generateContacts() {
  await prisma.filter.createMany({
    data: [
      {
        name: "weight",
        value: "250",
        text: "Вес",
        filterId: 1,
      },
      {
        name: "weight",
        value: "10",
        text: "Вес",
        filterId: 1,
      },
      {
        name: "drip",
        value: "true",
        text: "Дрип-пакеты",
        filterId: 1,
      },
      {
        name: "best",
        value: "true",
        text: "Лучшие товары",
        filterId: 1,
      },
    ],
  })
}
