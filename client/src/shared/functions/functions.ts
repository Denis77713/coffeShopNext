import { TypeDevelop } from "../types/types"

export function getListPayProductAccount(
  data: TypeDevelop[] | any,
  value: "Delivered" | "Получен" | "Успешный заказ"
) {
  const result = data?.filter((item: TypeDevelop) => item.status === value)
  return result
}
