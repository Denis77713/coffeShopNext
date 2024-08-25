import { prisma } from "./prisma-client"
import generateCategory from "./data/category"
import generateProduct from "./data/product"
import generateCity from "./data/city"
import generateLocation from "./data/location"
import generateWhiList from "./data/whyUsList"
import generateContacts from "./data/contacts"
import generateFilters from "./data/filters"

async function clearData() {
  // Чистка Category и обнуление id
  await prisma.$executeRaw`TRUNCATE TABLE "Category"RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Product"RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "City"RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Location"RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "WhyUsList"RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Contacts"RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Filter"RESTART IDENTITY CASCADE`
}
async function main() {
  try {
    await clearData()
    await generateCategory()
    await generateProduct()
    await generateCity()
    await generateLocation()
    await generateWhiList()
    await generateContacts()
    await generateFilters()
  } catch (e) {
    console.log(e)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
