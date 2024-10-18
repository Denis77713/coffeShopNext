import { prisma } from "../../../../prisma/prisma-client"

export const getProductList = async (id: number) => {
  const result = await prisma.product.findMany({
    where: {
      categoryId: id,
    },
  })
  return result
}

export async function getCategory(param: any) {
  const filtersData = prisma.category.findMany({
    where: {
      image: param.product,
    },
  })
  return filtersData
}
