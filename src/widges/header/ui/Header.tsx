import Image from "next/image"
import style from "./Header.module.css"
import IconList from "@/widges/iconList/ui/IconList"
import { FC } from "react"
import BurgerMenu from "@/features/navigation/ui/BurgerMenu"

const Header: FC = () => {
  return (
    <header className={`${style.headerFlex} container  `}>
      <BurgerMenu />
      <Image
        className={style.headerImage}
        src={"/logo.png"}
        alt="logo"
        width={75}
        height={75}
        priority={true}
      />
      <IconList search={false} />
    </header>
  )
}

export default Header
