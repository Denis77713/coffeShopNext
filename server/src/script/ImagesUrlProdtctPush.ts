import { prisma } from "../../../client/prisma/prisma-client"

const fs = require("fs")
const path = require("path")

export async function imageLoad() {
  const papka = fs.existsSync(path.resolve(__dirname, "/client/public"))
  if (papka) {
    const data = fs.readdirSync(
      path.resolve(__dirname, "../../../client/public/product")
    )
    // Заполнить imagesUrlProduct названиями изображений
    data.forEach(async (item: any) => {
      await prisma.imagesUrlProduct.create({
        data: {
          imageURL: item,
        },
      })
    })
  }
}
