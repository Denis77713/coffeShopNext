import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Магазин кофе | 24coffeshop - товары",
  },
  description: "Магазин лучшего кофе в Омске!",
}

export { ProductsPage as default } from '@/pages/products';
