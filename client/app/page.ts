import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Магазин кофе | 24coffeshop",
  },
  description: "Магазин лучшего кофе в Омске!",
}

export { /* @next-codemod-error `HomePage` export is re-exported. Check if this component uses `params` or `searchParams`*/
HomePage as default } from '@/pages/home';
