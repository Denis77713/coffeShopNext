import { cookies } from "next/headers"
import { getProductId } from "./getProductId"
import Image from "next/image"
import style from "./ProductInProductPage.module.css"
import GradeStar from "@/shared/Star/GradeStar"
import { apiServer } from "@/widges/header/api/api"
import { getComment } from "../api/api"
import CommentStarList from "@/entities/CommentStarList/CommentStarList"
import AddCommentInProduct from "@/features/AddCommentInProduct/ui/AddCommentInProduct"

const ProductInProductPage = async () => {
  const cookieStore = cookies()
  const cookieId = cookieStore.get("number")
  let result: any = null
  let star = null
  let gradeUsers = null
  let grade = null

  if (typeof cookieId !== "undefined") {
    const id = Number(cookieId.value)
    result = await getProductId(id)
    grade = await apiServer.post("/getGrade", { data: [result[0].id] })
    const newGradeSum = grade.data.reduce(
      (acc: any, number: any) => acc + number.grade,
      0
    )
    star =
      grade.data.length !== 0 ? Math.round(newGradeSum / grade.data.length) : 0
    gradeUsers = await getComment(grade.data)
  } else {
    result = false
  }
  if (star) star >= 5 ? (star = 5) : star
  const item = result[0]
  console.log(gradeUsers)
  return (
    <>
      {result ? (
        <div className={style.productWrapper}>
          <div className={style.ImageAndText}>
            <Image
              className={style.img}
              src={`/product/${item.imageUrl}.png`}
              alt={item.imageUrl}
              width={500}
              height={500}
              placeholder="blur"
              blurDataURL="/load.png"
            />
            <div className={style.comtent}>
              <h1>{item.name}</h1>
              <div>{item.price}</div>
            </div>
          </div>
          <GradeStar grade={star ? star : 0} productId={item.id} />
          <AddCommentInProduct
            grade={grade && grade.data}
            product={result && result}
          />
          {gradeUsers && <CommentStarList gradeUsers={gradeUsers} />}
        </div>
      ) : (
        <div>none</div>
      )}
    </>
  )
}

export default ProductInProductPage
