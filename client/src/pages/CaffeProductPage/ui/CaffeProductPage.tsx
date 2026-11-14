import { NavBar } from "@/features/Navbar/ui/Navbar"
import style from "./CaffeProductPage.module.css"
import { FC, memo } from "react"
import { getProductCaffe } from "../api/api"
import CaffeList from "@/widges/CaffeList/ui/CaffeList"

interface Iparams {
  id: string
}

const CaffeProductPage: FC<{ params: any }> = async ({ params }) => {
  const { id } = await params
  const data = await getProductCaffe(id)
  const textNav = data.secondCategory.map((item) => item.text)

  const CaffeListMemo = memo(CaffeList)
  return (
    <main>
      <NavBar sectionIds={textNav && textNav} />
      {data.secondCategory.map((item) => (
        <div id={item.text} key={item.id}>
          <h2 className={style.title}>{item.text}</h2>
          <CaffeListMemo
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
