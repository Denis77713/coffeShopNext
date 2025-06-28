import { NavBar } from "@/features/Navbar/ui/Navbar"
import style from "./CaffeProductPage.module.css"
import { FC } from "react"
import { getProductCaffe } from "../api/api"
import CaffeList from "@/widges/CaffeList/ui/CaffeList"

interface Iparams {
  id: string
}

const CaffeProductPage: FC<{ params: any }> = async ({ params }) => {
  const data = await getProductCaffe(params.id)
  const textNav = data.secondCategory.map((item) => item.text)
  return (
    <main>
      <NavBar sectionIds={textNav && textNav} />
      {data.secondCategory.map((item) => (
        <div id={item.text} key={item.id}>
          <h2 className={style.title}>{item.text}</h2>
          <CaffeList
            products={data.result}
            categoryId={item.id}
            category={data.category}
          />
        </div>
      ))}
    </main>
  )
}

export default CaffeProductPage
