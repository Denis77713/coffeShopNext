import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Admin",
  },
  description: "Страница Администратора",
}

export { /* @next-codemod-error `AdminPanelPage` export is re-exported. Check if this component uses `params` or `searchParams`*/
AdminPanelPage as default } from '@/pages/adminPanel';
