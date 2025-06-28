import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Магазин кофе | 24coffeshop - товары",
  },
  description: "Магазин лучшего кофе в Омске!",
}

export { /* @next-codemod-error `CaffeProductPage` export is re-exported. Check if this component uses `params` or `searchParams`*/
CaffeProductPage as default } from "@/pages/CaffeProductPage"
