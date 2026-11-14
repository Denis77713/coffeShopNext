import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Сеть кафе 24coffeshop",
  },
  description: "Лучший кофе в Омске!",
}

export { /* @next-codemod-error `ShopProductPage` export is re-exported. Check if this component uses `params` or `searchParams`*/
ShopProductPage as default } from "@/pages/ShopProductPage"
