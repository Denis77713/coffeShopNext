"use client"

import GradeStar from "@/shared/Star/GradeStar"
import style from "./CommentStarList.module.css"
import UserSVG from "./UserSVG"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

interface IgradeStars {
  user: string
  grade: number
  comment: null | string
}

const CommentStarList = (gradeUsers: any | IgradeStars | null) => {
  const CommentAndStar = useSelector(
    (store: any) => store.FormSlice.CommentAndStar
  )

  const [state, setState] = useState([])
  useEffect(() => {
    setState(CommentAndStar)
  }, [CommentAndStar])
  return (
    <>
      {state.length === 1
        ? state.map((item: IgradeStars) => (
            <div className={style.UserGrade} key={item.user}>
              <div className={style.grade}>
                <UserSVG className={style.img} />
                <div className={style.user}>{item.user}</div>
                <GradeStar grade={item.grade} productId={item.grade} />
              </div>
              <div>{item.comment}</div>
            </div>
          ))
        : gradeUsers.gradeUsers.map((item: IgradeStars) => (
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
            </div>
          ))}
    </>
  )
}
export default CommentStarList
