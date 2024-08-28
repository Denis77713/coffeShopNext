import { prisma } from "../../../../prisma/prisma-client"

export const getCategory = async (page: string, query: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1))
  // Получить страницу
  const category = await prisma.category.findMany({
    where: {
      page: page,
    },
  })
  let res = []
  if (Object.keys(query).length > 0)
    res.push(...(await getFilter(query, category)))
  let productData
  if (res.length === 0) {
    productData = await prisma.product.findMany({
      where: {
        categoryId: category[0].id,
        name: {
          contains: query.query,
          mode: "insensitive",
        },
      },
    })
  } else {
    if (typeof query.query === "undefined") {
      productData = res
    } else {
      let result: any = []
      res.forEach((item) => {
        if (
          item.name
            .toLocaleLowerCase()
            .includes(query.query.toLocaleLowerCase()) === true
        ) {
          result.push(item)
        }
      })
      productData = result
    }
  }
  // Получить фильтры
  const filtersData = await prisma.filter.findMany({
    where: {
      filterId: category[0].id,
    },
  })
  // Вернуть Товары и фильтры

  return { productData, filtersData }
}

async function getFilter(query: any, category: any) {
  let result
  const newQery = query
  result = await prisma.product.findMany({
    where: {...newQery,
    name: {
      contains: newQery.query,
      mode: "insensitive",
    }},
  })
  return result
}
