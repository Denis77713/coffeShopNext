import Image from "next/image"
import { getProduct } from "../api/api"
import style from "./BestProductList.module.css"

const BestProductList = async () => {
  const result = await getProduct()
  console.log(result)
  return (
    <div className={style.bestList}>
      {result.map((item) => (
        <div className={style.bestItem} key={item.id}>
          <div className={style.wrapper}>
            <Image
              src={`/product/${item.imageUrl}.png`}
              alt="ad"
              width={200}
              height={200}
            />
            <div className={style.weight}>{`${item.weight} г.`}</div>
          </div>
          <div>{item.name}</div>
          <div>{`${item.price} руб.`}</div>
        </div>
      ))}
    </div>
  )
}

export default BestProductList
