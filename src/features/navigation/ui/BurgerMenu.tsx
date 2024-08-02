"use client"
import Link from "next/link"
import style from "./BurgerMenu.module.css"
import { FC, useState } from "react"
import Image from "next/image"

const BurgerMenu: FC = () => {
  const [burger, setBurger] = useState(false)
  const navigationArr = [
    { id: 1, text: "Партнерам", link: "/partners" },
    { id: 2, text: "Вакансии", link: "/vacancies" },
    { id: 3, text: "Магазин", link: "/shop" },
  ]
  return (
    <>
      <Image
        className={style.burger}
        src={"/burger.svg"}
        alt="menu"
        width={40}
        height={40}
        onClick={() => setBurger(true)}
      />

      <div
        className={`${style.wrapper} ${style.dNone} ${burger && style.visible}`}
      >
        <div className={style.navigationContainer}>
          <h2 className={style.title}>Навигация</h2>
          {navigationArr.map((item) => (
            <Link className={style.navigation} key={item.id} href={item.link}>
              {item.text}
            </Link>
          ))}
          <Image
            className={style.image}
            src={"/close.svg"}
            alt="close"
            width={30}
            height={30}
            onClick={() => setBurger(false)}
          />
        </div>
      </div>
    </>
  )
}

export default BurgerMenu
