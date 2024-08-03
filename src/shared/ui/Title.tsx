import { FC } from "react"
import { getLocations } from "../api/api"
import style from "./Title.module.css"

type TypeCoffe = "true" | "false"

interface IntTitle {
  children: string
  coffeNum: TypeCoffe
}

const Title: FC<IntTitle> = async ({ children, coffeNum }) => {
  const res = await getLocations()
  const numCoffe = res
    .filter((item) => item.newIsOpen === false)
    .filter((item) => item.isWork === false)
  return (
    <div className={`${style.wrapper} ${coffeNum && style.dflex}`}>
      <h2 className={style.title}>{`${children} `}</h2>
      {coffeNum && <div className={style.number}>{numCoffe.length}</div>}
    </div>
  )
}

export default Title
