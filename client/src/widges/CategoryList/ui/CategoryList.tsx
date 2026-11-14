import Image from "next/image"
import style from "./CategoryList.module.css"
import Link from "next/link"
import { FC } from "react"
import { Icategory } from "@/shared/types/types"

const CategoryList: FC<{ page: string; category: Icategory[] | null }> = ({
  page,
  category,
}) => {
  return (
    <div className={`container ${style.cartList} `}>
      {category?.map((item) => (
        <div className={style.cart} key={item.id}>
          <Link href={`${page}/${item.page}`}>
            <Image
              className={style.img}
              src={`/categories/${item.image}.webp`}
              alt={item.name}
              width={220}
              height={300}
              placeholder="blur"
              blurDataURL="/load.png"
            />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoryList
