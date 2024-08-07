import { FC } from "react"
import { getLocations } from "../api/api"
import style from "./Title.module.css"

type TypeCoffe = "true" | "false"

interface IntTitle {
  children: string
  coffeNum: TypeCoffe
  styles?: string
}

const Title: FC<IntTitle> = async ({ children, coffeNum, styles }) => {
  const res = await getLocations()
  const numCoffe = res
    .filter((item) => item.newIsOpen === false)
    .filter((item) => item.isWork === false)
  return (
    <div
      className={`container ${style.wrapper} ${coffeNum === "true" && style.dflex} ${
        styles && styles
      }`}
    >
      <h2 className={style.title}>{`${children} `}</h2>
      {coffeNum === "true" && (
        <div className={style.number}>{numCoffe.length}</div>
      )}
    </div>
  )
}

export default Title
