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
import { Iproduct } from "@/shared/types/types"

export interface IproductID {
  productID: string
}

const ProductInProductPage: FC<{
  params: any
  searchParams: any
}> = async ({ params, searchParams }) => {
  //

  //
  const idProduct = Number(searchParams.productID)
  //
  const result: Iproduct[] = await getProductId(idProduct)
  const grade =
    result && (await apiServer.post("/getGrade", { data: [idProduct] }))
  const item: Iproduct = result && result[0]
  const newData = grade.data.filter((i: any) => i.productId === item.id)
  const gradeUsers = result && (await getComment(newData))
  const star = getStarAndGrade(newData)
  //
  //
  return (
    <>
      {result ? (
        <div className={style.productWrapper}>
          <div className={style.ImageAndText}>
            <div className={style.wrapperImgStar}>
              <Image
                className={style.img}
                src={`/product/${item.imageUrl}`}
                alt={item.imageUrl}
                width={500}
                height={500}
                placeholder="blur"
                blurDataURL="/load.png"
              />
              <div className={style.starWrapper}>
                <GradeStar
                  grade={star ? star : 0}
                  productId={item.id}
                  clicked={false}
                />
              </div>
            </div>
            <div className={style.comtent}>
              <h1>{item.name}</h1>
              <div>{item.price}</div>
              <p>{item.text}</p>
            </div>
          </div>

          <AddCommentInProduct
            grade={grade && grade.data}
            product={result && result}
            Params={searchParams}
          />

          <CommentStarList gradeUsers={gradeUsers} />
        </div>
      ) : (
        <div>none</div>
      )}
    </>
  )

  function getStarAndGrade(data: any) {
    const newGradeSum = data.reduce(
      (acc: any, number: any) => acc + number.grade,
      0
    )
    let star = data.length !== 0 ? Math.round(newGradeSum / data.length) : 0
    if (star) star >= 5 ? (star = 5) : star

    return star
  }
}

export default ProductInProductPage
