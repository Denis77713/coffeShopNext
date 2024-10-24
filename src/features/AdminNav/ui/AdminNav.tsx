import Link from "next/link"
import style from './stype.module.css'

const AdminNav = () => {
  const nav = [
    { id: 1, href: "/adminPanel", text: "Админ панель" }
    // { id: 2, href: "/adminPanel/product", text: "Продукты" },
  ]
  return (
    <div className={` ${style.navigation}`}>
      {nav.map((item) => (
        <Link key={item.id} href={item.href}>
          {item.text}
        </Link>
      ))}
    </div>
  )
}

export default AdminNav
