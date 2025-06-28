import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Магазин кофе | 24coffeshop - товар",
  },
  description: "Магазин лучшего кофе в Омске!",
}

export { /* @next-codemod-error `ShopProductPage` export is re-exported. Check if this component uses `params` or `searchParams`*/
ShopProductPage as default } from "@/pages/ShopProductPage"
