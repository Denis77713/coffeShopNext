import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Admin",
  },
  description: "Страница Администратора",
}

export { AdminPanelPage as default } from '@/pages/adminPanel';
