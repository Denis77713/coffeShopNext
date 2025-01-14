import { prisma } from "../prisma-client"

export default async function generateLocation() {
  await prisma.location.createMany({
    data: [
      // 1
      {
        adress: "б-р Архитекторов, 35",
        locatin: "ТЦ МЕГА",
        time: "10:00 - 22:00",
        isWork: false,
        newIsOpen: false,
        newLocation: "newLocation",
        menu: "/menu",
        cityId: 1,
      },
      // 2
      {
        adress: "Декабристов, 91",
        locatin: "СКК им. В.Блинова",
        time: "",
        isWork: true,
        newIsOpen: false,
        newLocation: "newLocation",
        menu: "/menu",
        cityId: 1,
      },
      // 3
      {
        adress: "б-р Архитекторов, 35",
        locatin: "ТЦ МЕГА",
        time: "10:00 - 22:00",
        isWork: false,
        newIsOpen: false,
        newLocation: "newLocation",
        menu: "/menu",
        cityId: 1,
      },
      // 4
      {
        adress: "70 лет Октября, 19",
        locatin: "ТЦ Festival City",
        time: "06:55 - 23:05",
        isWork: false,
        newIsOpen: false,
        newLocation: "newLocation",
        menu: "/menu",
        cityId: 1,
      },
      // 5
      {
        adress: "Интернациональная, 35",
        locatin: "ТЦ МЕГА",
        time: "10:00 - 22:00",
        isWork: false,
        newIsOpen: false,
        newLocation: "newLocation",
        menu: "/menu",
        cityId: 1,
      },
      // 6
      {
        adress: "Лермонтова, 4Б",
        locatin: "",
        time: "06:55 - 23:05",
        isWork: false,
        newIsOpen: false,
        newLocation: "newLocation",
        menu: "/menu",
        cityId: 1,
      },
      // 7
      {
        adress: "Маркса, 10",
        locatin: "",
        time: "10:00 - 22:00",
        isWork: false,
        newIsOpen: false,
        newLocation: "newLocation",
        menu: "/menu",
        cityId: 1,
      },
      // 8
      {
        adress: "Аграрный университет",
        locatin: "",
        time: "",
        isWork: false,
        newIsOpen: true,
        newLocation: "newLocation",
        menu: "/menu",
        cityId: 1,
      },
    ],
  })
}
