"use client"

import GradeStar from "@/shared/Star/GradeStar"
import style from "./CommentStarList.module.css"
import UserSVG from "./UserSVG"
import { useSelector } from "react-redux"
import { FC, useEffect, useState } from "react"
import Button from "@/shared/ui/Button"
import { deleteComment } from "./api"

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
  //
  //
  return (
    <>
      {gradeUsers.map((item: IgradeStars) => (
        <div className={style.UserGrade} key={item.user}>
          <div className={style.grade}>
            <UserSVG className={style.img} />
            <div className={style.user}>{item.user}</div>
            <GradeStar
              grade={item.grade}
              productId={item.grade}
              clicked={false}
            />
          </div>
          <div>{item.comment}</div>

          <Button handleClick={() => deleteComment(item.id)}>Удалить</Button>
        </div>
      ))}
    </>
  )
}
export default CommentStarList
