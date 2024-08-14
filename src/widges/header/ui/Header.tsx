import Image from "next/image"
import style from "./Header.module.css"
import IconList from "@/widges/iconList/ui/IconList"
import { FC } from "react"
import BurgerMenu from "@/features/navigation/ui/BurgerMenu"
import Link from "next/link"

const Header: FC = () => {
  return (
    <header className={`${style.headerFlex} container  `}>
      <BurgerMenu />
      <Link href={"/"}>
        <Image
          className={style.headerImage}
          src={"/logo.png"}
          alt="logo"
          width={75}
          height={75}
          priority={true}
        />
      </Link>
      <IconList search={false} />
    </header>
  )
}

export default Header
