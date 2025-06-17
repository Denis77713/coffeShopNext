"use client"

import { FC, useState } from "react"
import styleInput from "@/features/Search/ui/Search.module.css"
import style from "./UserItemRedaction.module.css"
import Button from "@/shared/ui/Button"
import { updateUser } from "../api/api"
import { TypeUser } from "@/shared/types/types"
import { useDispatch, useSelector } from "react-redux"
import { getWindow } from "@/shared/reducers/FormSlice"
import Image from "next/image"
//
//
const UserItemRedaction: FC<{ item: TypeUser; setData: any; setId: any }> = ({
  item,
  setData,
  setId,
}) => {
  //
  //
  const [mail, setMail] = useState<string>(item.email)
  const [name, setName] = useState<string>(item.name)
  const [lastName, setLastName] = useState<string>(item.lastName)
  const arrRole = ["user", "admin", "manager", "sklad"]
  const newArrRole = arrRole.filter((i: string) => i !== item.role)
  const [role, setRole] = useState<string>(item.role)
  const [activeted, setActiveted] = useState<any>(item.isActivated)
  const dispatch = useDispatch()
  //
  //
  return (
    <div className={style.userUpdateWrapper}>
      <input
        className={styleInput.input}
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        type="text"
      />
      <input
        className={styleInput.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <input
        className={styleInput.input}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
      />
      <select
        value={String(activeted)}
        onChange={(e) => setActiveted(!activeted)}
      >
        <option value={activeted}>{activeted + ""}</option>
        <option value={!activeted + ""}>{!activeted + ""}</option>
      </select>
      {/*  */}
      {/*  */}
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value={item.role}>{item.role}</option>
        {newArrRole.map((inner) => (
          <option value={inner} key={inner}>
            {inner}
          </option>
        ))}
      </select>
      <Button
        handleClick={async () => {
          const res = await updateUser(
            item.id,
            mail,
            name,
            lastName,
            role,
            activeted
          )
          setData(res)
        }}
      >
        Редактировать пользователя
      </Button>

      <Image
        className={style.delete}
        src={`/close.svg`}
        alt={"delete"}
        width={30}
        height={30}
        onClick={() => {
          dispatch(getWindow("deleteUser"))
          setId(item.id)
        }}
      />
    </div>
  )
}

export default UserItemRedaction
