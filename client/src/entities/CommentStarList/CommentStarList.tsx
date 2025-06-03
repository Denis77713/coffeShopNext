"use client"

import GradeStar from "@/shared/Star/GradeStar"
import style from "./CommentStarList.module.css"
import UserSVG from "./UserSVG"
import { useSelector } from "react-redux"
import { FC, useEffect, useState } from "react"
import Button from "@/shared/ui/Button"
import { deleteComment } from "./api"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface IgradeStars {
  id: number
  user: string
  grade: number
  comment: null | string
}

const CommentStarList: FC<{
  gradeUsers: any | IgradeStars | null
}> = ({ gradeUsers }) => {
  //
  //
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  //
  const User = useSelector((store: any) => store.FormSlice.User)
  const [gradeUsersState, setGradeUsersState] = useState([])
  //
  useEffect(() => {
    setGradeUsersState(gradeUsers)
  }, [gradeUsers])
  return (
    <>
      {gradeUsersState.map((item: IgradeStars) => (
        <div className={style.UserGrade} key={item.user}>
          <div className={style.grade}>
            <UserSVG className={style.img} />
            <div className={style.user}>{item.user}</div>
            <GradeStar
              grade={item.grade}
              productId={item.grade}
              clicked={false}
            />
            {User.role === "admin" && (
              <div className={style.deleteButton}>
                <Button
                  handleClick={(e: any) => {
                    deleteComment(item.id)
                    setGradeUsersState(
                      gradeUsersState.filter(
                        (i: IgradeStars) => i.id !== item.id
                      )
                    )
                    postSearch(item.id)
                  }}
                >
                  Удалить комментарий
                </Button>
              </div>
            )}
          </div>
          <div>{item.comment}</div>
        </div>
      ))}
    </>
  )
  function postSearch(num: number) {
    const params = new URLSearchParams(searchParams)
    params.set("deleted", String(num))
    replace(`${pathName}?${params.toString()}`)
  }
}
export default CommentStarList
