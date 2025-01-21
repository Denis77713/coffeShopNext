import { prisma } from "../prisma-client"

export default async function generateContacts() {
  await prisma.contacts.createMany({
    data: [
      {
        email: "partners@coffeeshop.ru",
        text: "Поставщикам и партнёрам",
      },
      {
        email: "marketing@coffeeshop.ru",
        text: "Для маркетинга и СМИ",
      },
      {
        email: "rent@coffeeshop.ru",
        text: "Предложить помещение в аренду:",
      },
      {
        email: "hello@coffeeshop.ru",
        text: "Если вы хотите просто написать нам:",
      },
    ],
  })
}
