import GradeStar from "@/shared/Star/GradeStar"
import style from "./CommentStarList.module.css"
import UserSVG from "./UserSVG"

interface IgradeStars {
  user: string
  grade: number
  comment: null | string
}

const CommentStarList = (gradeUsers: any | IgradeStars | null) => {
  console.log(gradeUsers)
  return (
    <>
      {gradeUsers.gradeUsers.map((item: IgradeStars) => (
        <div className={style.UserGrade} key={item.user}>
          <div className={style.grade}>
            <UserSVG className={style.img} />
            <div className={style.user}>{item.user}</div>
            <GradeStar grade={item.grade} productId={item.grade} />
          </div>
          <div>{item.comment}</div>
        </div>
      ))}
    </>
  )
}
export default CommentStarList
