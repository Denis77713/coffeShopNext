"use client"

import Image from "next/image"
import style from "./Header.module.css"
import { FC, useEffect } from "react"
import BurgerMenu from "@/features/navigation/ui/BurgerMenu"
import Link from "next/link"
import LikeGroup from "@/features/likeGroup/ui/likeGroup"
import { getActivatedUser, refresh } from "../api/api"
import FormRegistration from "../../../features/FormRegistration/ui/FormRegistration"
import FormAccount from "@/features/FormAccount/ui/FormAccount"
import { useDispatch, useSelector } from "react-redux"
import { getAuth, getWindow } from "@/shared/Form/ui/FormSlice"
import FormLogin from "@/features/FormLogin/ui/FormLogin"
import { logout } from "@/features/FormRegistration/api/api"
const Header: FC = () => {
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  const Auth = useSelector((store: any) => store.FormSlice.Auth)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("render")
    const cheskRefresh = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const data = await refresh()
          localStorage.setItem("token", data.data.accessToken)
          if (data.data.user.isActivated && data.status === 200)
            dispatch(getAuth(data.status))
        }
      } catch (e:any) {
        dispatch(getAuth(e.status))
      }
    }
    cheskRefresh()
  }, [])
  return (
    <>
      <header className={`${style.headerFlex} container`}>
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
        <div className={style.icons}>
          <Image
            className={style.icon}
            onClick={() => refresh()}
            src={"/cart.svg"}
            alt="cart"
            width={30}
            height={30}
          />
          <Image
            className={style.icon}
            src={"/user.svg"}
            alt="cart"
            width={30}
            height={30}
            onClick={() => dispatch(getWindow("account"))}
          />
          {Auth === 200 && (
            <Image
              className={style.icon}
              src={"/logout.svg"}
              alt="cart"
              width={21}
              height={21}
              onClick={() => {
                logout()
                dispatch(getAuth(false))
              }}
            />
          )}
          <LikeGroup />
        </div>
      </header>

      {formVisible === "account" && Auth !== 200 && <FormAccount />}
      {formVisible === "registrarion" && <FormRegistration />}
      {formVisible === "login" && Auth !== 200 && <FormLogin />}
    </>
  )
}

export default Header
