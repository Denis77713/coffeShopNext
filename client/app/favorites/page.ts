import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Магазин кофе | 24coffeshop - избранное",
  },
  description: "Магазин лучшего кофе в Омске!",
}


export { /* @next-codemod-error `Favorites` export is re-exported. Check if this component uses `params` or `searchParams`*/
Favorites as default } from '@/pages/favorites';
