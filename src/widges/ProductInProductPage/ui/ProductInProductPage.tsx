import { cookies } from "next/headers"
import { getProductId } from "./getProductId"
import Image from "next/image"
import style from './ProductInProductPage.module.css'

const ProductInProductPage = async () => {
  const cookieStore = cookies()
  const cookieId = cookieStore.get("number")
  let result = null
  if (typeof cookieId !== "undefined") {
    const id = Number(cookieId.value)
    result = await getProductId(id)
  } else {
    result = false
  }

  console.log(result)
  const item = result[0]
  return (
    <>
      {result ? (
        <div className={style.productWrapper}>
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
      ) : (
        <div>none</div>
      )}
    </>
  )
}

export default ProductInProductPage
