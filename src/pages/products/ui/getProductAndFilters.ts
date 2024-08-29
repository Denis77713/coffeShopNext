import { prisma } from "../../../../prisma/prisma-client"

export type category = { id: number; name: string; image: string; page: string }

export const getCategory = async (page: string, query: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1))
  // Получить категорию
  const category = await getCategoryProdusct(page)
  // Получить товары учитывая фильтры
  const productData = await getFilter(query, category)
  // Получить фильтры
  const filtersData = await getFilters(category)
  // Вернуть Товары и фильтры
  return { productData, filtersData }
}

async function getFilter(query: any, category: category[]) {
  let result
  const newQery = query
  let search = ""
  if (newQery.hasOwnProperty("query") === true) {
    search = newQery.query
    delete newQery.query
  }
  result = await prisma.product.findMany({
    where: {
      ...newQery,
      categoryId: category[0].id,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  })
  return result
}

async function getCategoryProdusct(page: string) {
  const category = await prisma.category.findMany({
    where: {
      page: page,
    },
  })
  return category
}

async function getFilters(category:category[]) {
  const filtersData = prisma.filter.findMany({
    where: {
      filterId: category[0].id,
    },
  })
  return filtersData
}
