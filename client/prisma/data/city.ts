import { prisma } from "../prisma-client"

export default async function generateCity() {
  await prisma.city.createMany({
    data: [
      {
        name: "Омск",
      },
      {
        name: "Москва",
      },
      {
        name: "Новосибирск",
      },
      {
        name: "Уфа",
      },
    ],
  })
}
