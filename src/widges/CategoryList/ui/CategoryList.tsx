import Image from "next/image"
import { getCategory } from "../api/api"
import style from "./CategoryList.module.css"
import Link from "next/link"

const CategoryList = async () => {
  const category = await getCategory()
  return (
    <div className={`container ${style.cartList} `}>
      {category?.map((item) => (
        <div className={style.cart} key={item.id}>
          <Link href={item.page}>
            <Image
              className={style.img}
              src={`/categories/${item.image}.webp`}
              alt={item.name}
              width={220}
              height={300}
            />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoryList
