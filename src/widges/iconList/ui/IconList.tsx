import Image from "next/image"
import { FC } from "react"
import style from './iconList.module.css'

type TypeSearch = true | false

interface InterfaseIconList {
  search: TypeSearch
}
const IconList: FC<InterfaseIconList> = ({ search }) => {
  return (
    <div className={style.icons}>
      <Image className={style.icon} src={"/cartsvg.svg"} alt="cart" width={30} height={30} />
      <Image className={style.icon} src={"/user.svg"} alt="cart" width={30} height={30} />
      <Image className={style.icon} src={"/like.svg"} alt="cart" width={30} height={30} />
      {search && (
        <Image className={style.icon} src={"/search.svg"} alt="cart" width={30} height={30} />
      )}
    </div>
  )
}

export default IconList
