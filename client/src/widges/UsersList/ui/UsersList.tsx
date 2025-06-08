"use client"

import UserItemRedaction from "@/entities/UserItemRedaction/ui/UserItemRedaction"
import { deleteData, getUsers } from "../api/api"
import { useEffect, useState } from "react"
import { TypeUser } from "@/shared/types/types"
import { useDispatch, useSelector } from "react-redux"
import Form from "@/shared/Form/ui/Form"
import Button from "@/shared/ui/Button"
import { getWindow } from "@/shared/reducers/FormSlice"
import style from "./UsersList.module.css"

const UsersList = () => {
  //
  //

  const [data, setData] = useState<TypeUser[] | null>(null)
  const User = useSelector((store: any) => store.FormSlice.User)
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  const dispatch = useDispatch()
  const [id, setId] = useState(0)
  //
  //

  useEffect(() => {
    async function func() {
      const result = await getUsers(User.id)
      setData(result)
    }
    func()
  }, [User])
  //
  //

  return (
    <>
      {formVisible === "deleteUser" && (
        <Form>
          <h2>Удалить пользователя?</h2>
          <div className={style.buttons}>
            <Button
              handleClick={async (e: any) => {
                e.preventDefault()
                const result = await deleteData(id)
                setData(result)
                dispatch(getWindow(false))
              }}
            >
              Да
            </Button>
            <Button handleClick={() => dispatch(getWindow(false))}>Нет</Button>
          </div>
        </Form>
      )}
      <div className="container">
        {data?.map((item: TypeUser) => (
          <UserItemRedaction
            key={item.id}
            item={item}
            setData={setData}
            setId={setId}
          />
        ))}
      </div>
    </>
  )
}

export default UsersList
