import { prisma } from "../../../../prisma/prisma-client"

export const getCategory = async (page: string, query: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1))
  // Получить страницу
  const category = await prisma.category.findMany({
    where: {
      page: page,
    },
  })
  // console.log(query)
  let res = []
  if (Boolean(query.best) === true)
    res.push(...(await getBest(query, category)))
  if (Boolean(query.drip) === true)
    res.push(...(await getDrip(query, category)))
  // if (typeof(query.weightMax) !== 'undefined')
  //   res.push(...(await getDrip(query, category)))
  // Получить товары
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
  
  // console.log(productData)
  return { productData, filtersData }
}

async function getBest(query: any, category: any) {
  let result
  result = await prisma.product.findMany({
    where: {
      categoryId: category[0].id,
      best: Boolean(query.best),
    },
  })
  return result
}

async function getDrip(query: any, category: any) {
  let result
  result = await prisma.product.findMany({
    where: {
      categoryId: category[0].id,
      drip: Boolean(query.drip),
    },
  })
  return result
}
async function weightMax(query: any, category: any) {
  let result
  result = await prisma.product.findMany({
    where: {
      categoryId: category[0].id,
      weight: query.weightMax,
    },
  })
  return result
}
async function weightMin(query: any, category: any) {
  let result
  result = await prisma.product.findMany({
    where: {
      categoryId: category[0].id,
      weight: query.weightMin,
    },
  })
  return result
}
async function qwe(query: any, category: any) {
  let result
  result = await prisma.product.findMany({
    where: query
  })
  return result
}
