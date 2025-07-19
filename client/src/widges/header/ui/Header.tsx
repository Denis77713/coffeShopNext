"use client"

import Image from "next/image"
import style from "./Header.module.css"
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react"
import BurgerMenu from "@/features/navigation/ui/BurgerMenu"
import Link from "next/link"
import FormRegistration from "../../../features/FormRegistration/ui/FormRegistration"
import FormAccount from "@/features/FormAccount/ui/FormAccount"
import { useDispatch, useSelector } from "react-redux"
import { getActivated, getAuth, getWindow } from "@/shared/reducers/FormSlice"
import FormLogin from "@/features/FormLogin/ui/FormLogin"
import { logout } from "@/features/FormRegistration/api/api"
import { redirectAction } from "@/pages/account/api/api"
import IconHeader from "@/features/IconHeader/ui/IconHeader"
import CartForm from "@/widges/CartForm/ui/CartForm"
import { isLikeFilter } from "@/shared/like/ui/FunctionsLike"
import IconHeaderList from "@/widges/IconHeaderList/IconHeaderList"

const Header: FC = () => {
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  const Auth = useSelector((store: any) => store.FormSlice.Auth)
  const Activated = useSelector((store: any) => store.FormSlice.Activated)
  const dispatch = useDispatch()
  const [cart, setCart] = useState([])
  const User = useSelector((store: any) => store.FormSlice.User)
  const [href, setHref] = useState(getHref(User.role))
  //
  //
  //
  useEffect(() => {
    setHref(getHref(User.role))
  }, [User])
  //
  //

  //
  //
  const MemoBurgerMenu = memo(BurgerMenu)

  return (
    <>
      <header className={`${style.headerFlex} container`}>
        <MemoBurgerMenu />
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
        <div className={style.icons}>
          <IconHeaderList setCart={setCart} />
          {Activated === true && Auth === 200 ? (
            <a href={href}>
              <div className={style.account}>
                <Image
                  className={`${style.icon} ${style.account}`}
                  src={"/user.svg"}
                  alt="user"
                  width={30}
                  height={30}
                />
              </div>
            </a>
          ) : (
            <Image
              className={`${style.icon}`}
              src={"/user.svg"}
              alt="user"
              width={30}
              height={30}
              onClick={() => dispatch(getWindow("account"))}
            />
          )}
          {Activated === true && Auth === 200 && (
            <div className={style.exit}>
              <Image
                className={`${style.icon} ${style.logout}`}
                src={"/logout.svg"}
                alt="logout"
                width={21}
                height={21}
                onClick={() => {
                  logout()
                  dispatch(getAuth(false))
                  dispatch(getActivated(false))
                  localStorage.removeItem("token")
                  redirectAction("/")
                  dispatch(getWindow(false))
                }}
              />
            </div>
          )}
        </div>
      </header>
      {formVisible === "account" && <FormAccount />}
      {formVisible === "registrarion" && <FormRegistration />}
      {formVisible === "login" && <FormLogin />}
      {cart && cart.length !== 0 && formVisible === "cart" && (
        <CartForm setCart={setCart} />
      )}
    </>
  )
  function getHref(role: string) {
    let res = "/account"
    if (role === "admin") res = "/adminPanel"
    if (role === "manager") res = "/managerPage"
    if (role === "sklad") res = "/managerPage"
    if (role === "user") res = "/account"
    return res
  }
}

export default Header
