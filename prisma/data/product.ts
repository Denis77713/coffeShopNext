import { prisma } from "../prisma-client"

export default async function generateProduct() {
  await prisma.product.createMany({
    data: [
      // 1
      {
        name: "Боливия Каранави",
        imageUrl: "variant1",
        price: '990.0',
        weight: '250',
        best: 'true',
        none: 'false',
        categoryId: 1,
        drip: 'false',
      },
      // 2
      {
        name: "Колумбия Желтый бурбон",
        imageUrl: "variant2",
        price: '1390.0',
        weight: '250',
        best: 'true',
        none: 'false',
        categoryId: 1,
        drip: 'false',
      },
      // 3
      {
        name: "Дрип-пакеты Бразилия Моджиана",
        imageUrl: "variant4",
        price: '699.0',
        weight: '10',
        best: 'true',
        none: 'false',
        categoryId: 1,
        drip: 'true',
      },
      // 4
      {
        name: "Дрип-пакеты Колумбия Уила",
        imageUrl: "variant5",
        price: '799.0',
        weight: '10',
        best: 'true',
        none: 'false',
        categoryId: 1,
        drip: 'true',
      },
      // 5
      {
        name: "Дрип-пакеты Эфиопия Реку",
        imageUrl: "variant6",
        price: '899.0',
        weight: '10',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'true',
      },
      // 6
      {
        name: "Дрип-пакеты Кения Маунт",
        imageUrl: "variant4",
        price: '799.0',
        weight: '10',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'true',
      },
      // 7
      {
        name: "Бразилия Желтый Бурбон",
        imageUrl: "variant3",
        price: '799',
        weight: '250',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'false',
      },
      // 8
      {
        name: "Эфиопия Гуджи Урага",
        imageUrl: "variant2",
        price: '1290',
        weight: '250',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'false',
      }, // 9
      {
        name: "Колумбия Арсила",
        imageUrl: "variant1",
        price: '990.0',
        weight: '250',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'false',
      },
      // 10
      {
        name: "Эфиопия Геша",
        imageUrl: "variant2",
        price: '1390.0',
        weight: '250',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'false',
      },
      // 11
      {
        name: "Кения Маунт",
        imageUrl: "variant3",
        price: '699.0',
        weight: '250',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'false',
      },
      // 12
      {
        name: "Эфиопия Реку",
        imageUrl: "variant1",
        price: '959',
        weight: '250',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'false',
      },
      // 13
      {
        name: "Руанда Мутетели",
        imageUrl: "variant3",
        price: '819',
        weight: '250',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'false',
      },
      // 14
      {
        name: "Индонезия Линтонг",
        imageUrl: "variant1",
        price: '990',
        weight: '250',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'false',
      },
      // 15
      {
        name: "Гватемала Акатенанго",
        imageUrl: "variant1",
        price: '759',
        weight: '250',
        best: 'false',
        none: "false",
        categoryId: 1,
        drip: 'false',
      },
      // 16
      {
        name: "Китай Симао",
        imageUrl: "variant2",
        price: '649',
        weight: '250',
        best: 'false',
        none: 'false',
        categoryId: 1,
        drip: 'false',  
      },
    ],
  })
}
