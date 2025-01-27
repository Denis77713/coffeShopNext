import { prisma } from "../../../../prisma/prisma-client"

export type category = { id: number; name: string; image: string; page: string }

export const getCategory = async (page: string, query: any, numProductInPage: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1))
  // Получить категорию
  const category = await getCategoryProdusct(page)
  // Получить товары и число товаров учитывая фильтры
  const data = await getFilter(query, category, numProductInPage)
  // Возвращает фильтры с чекбоксом для конкретных товаров
  const filtersData = await getFilters(category)
  // товары
  const productData = data.result
  // число товаров
  const numProduct = data.numRecord
  // Вернуть Товары, фильтры, число товаров
  return { productData, filtersData, numProduct }
}

async function getFilter(query: any, category: category[],numProductInPage: number) {
  let result
  let numRecord
  const newQery = query
  let pagination = 0
  let search = ""
  if (newQery.hasOwnProperty("query") === true) {
    search = newQery.query
    // удалить свойство query из объекта newQery
    delete newQery.query
  }
  if (newQery.hasOwnProperty("delete") === true) delete newQery.delete
  if (newQery.hasOwnProperty("page") === true) {
    if(Number(newQery.page)===1){
      pagination = 0  
    }else{
      pagination = (Number(newQery.page)-1)*numProductInPage
    }
    delete newQery.page
  }
  // Вернуть число записей с учетом фильтров и игнором пагинации
  numRecord = await prisma.product.count({
    where: {
      // в нем остались фильтры с чекбоксами
      ...newQery,
      categoryId: category[0].id,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  })
  result = await prisma.product.findMany({
    // Сколлько отображать товаров
    take: numProductInPage,
    skip: pagination,
    where: {
      // в нем остались фильтры с чекбоксами
      ...newQery,
      categoryId: category[0].id,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  })
  return { result, numRecord }
}

export async function getCategoryProdusct(page: string) {
  const category = await prisma.category.findMany({
    where: {
      page: page,
    },
  })
  return category
}

async function getFilters(category: category[]) {
  const filtersData = prisma.filter.findMany({
    where: {
      filterId: category[0].id,
    },
  })
  return filtersData
}
