import Link from "next/link"

const AdminNav = () => {
  const nav = [
    { id: 1, href: "/adminPanel", text: "Админ панель" }
    // { id: 2, href: "/adminPanel/product", text: "Продукты" },
  ]
  return (
    <>
      {nav.map((item) => (
        <Link key={item.id} href={item.href}>
          {item.text}
        </Link>
      ))}
    </>
  )
}

export default AdminNav
