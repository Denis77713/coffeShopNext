import { prisma } from "./prisma-client"
import generateCategory from "./data/category"
import generateProduct from "./data/product"
import generateCity from "./data/city"
import generateLocation from "./data/location"
import generateWhiList from "./data/whyUsList"

async function clearData() {
  // Чистка Category и обнуление id
  await prisma.$executeRaw`TRUNCATE TABLE "Category"RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Product"RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "City"RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Location"RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "WhyUsList"RESTART IDENTITY CASCADE`
}
async function main() {
  try {
    await clearData()
    await generateCategory()
    await generateProduct()
    await generateCity()
    await generateLocation()
    await generateWhiList()
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