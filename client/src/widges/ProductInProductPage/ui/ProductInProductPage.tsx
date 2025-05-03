import { getProductId } from "./getProductId"
import Image from "next/image"
import style from "./ProductInProductPage.module.css"
import GradeStar from "@/shared/Star/GradeStar"
import { apiServer } from "@/widges/header/api/api"
import { getComment } from "../api/api"
import CommentStarList from "@/entities/CommentStarList/CommentStarList"
import AddCommentInProduct from "@/features/AddCommentInProduct/ui/AddCommentInProduct"
import { IParams } from "@/pages/shop/ui/ShopPage"
import { FC } from "react"

export interface IproductID {
  productID: string
}

const ProductInProductPage: FC<{
  params: IParams
  searchParams: IproductID
}> = async ({ params, searchParams }) => {
  //
  //
  const idProduct = Number(searchParams.productID)
  //
  const result = await getProductId(idProduct)
  const grade = await apiServer.post("/getGrade", { data: [result[0].id] })
  const gradeUsers = await getComment(grade.data)
  const item = result[0]
  const star = getStarAndGrade()
  //
  console.log(result)
  //
  return (
    <>
      {result ? (
        <div className={style.productWrapper}>
          <div className={style.ImageAndText}>
            <Image
              className={style.img}
              src={
                result[0].secondCategoryId
                  ? `/cafe/${item.imageUrl}.jpg`
                  : `/product/${item.imageUrl}.png`
              }
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
          <GradeStar
            grade={star ? star : 0}
            productId={item.id}
            clicked={false}
          />
          <AddCommentInProduct
            grade={grade && grade.data}
            product={result && result}
          />

          <CommentStarList gradeUsers={gradeUsers} />
        </div>
      ) : (
        <div>none</div>
      )}
    </>
  )

  function getStarAndGrade() {
    const newGradeSum = grade.data.reduce(
      (acc: any, number: any) => acc + number.grade,
      0
    )
    let star =
      grade.data.length !== 0 ? Math.round(newGradeSum / grade.data.length) : 0
    if (star) star >= 5 ? (star = 5) : star

    return star
  }
}

export default ProductInProductPage
