import { prisma } from "../../../../prisma/prisma-client"

export const getContacts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const result = await prisma.contacts.findMany({
  })
  return result
}
// const result = await getContacts()
