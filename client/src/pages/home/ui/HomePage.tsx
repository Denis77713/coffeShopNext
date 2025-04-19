import CarouselSlider from "@/entities/CarouselSlider/ui/CarouselSlider"
import CategoryList from "@/widges/CategoryList/ui/CategoryList"
import LocationsList from "@/widges/LocationsList/ui/LocationsList"
import Title from "@/shared/ui/Title"
import style from "./HomePage.module.css"
import { Suspense } from "react"
import Skeleton from "@/shared/ui/Skeleton"
import assortiment from "@/widges/CategoryList/ui/CategoryList.module.css"
import BestProductList from "@/widges/BestProductList/ui/BestProductList"
import bestStyle from "@/widges/BestProductList/ui/BestProductList.module.css"
import bestStyleItem from "@/entities/Product/ui/Product.module.css"
import WhyUsList from "@/widges/WhyUsList/ui/WhyUsList"
import { getProduct } from "../api/api"
import { getCategoryes } from "@/widges/CategoryList/api/api"
import img from "@/../public/slider/slide1.jpg"
import Image from "next/image"
import IsToken from "@/shared/Hookcs/IsToken"
import GradeStar from "../../../shared/Star/GradeStar"

export default async function Home() {
  // Лучшие продусты
  const bestProductList = await getProduct()
  const list = assortiment.cartList
  const cart = assortiment.cart
  const bestList = bestStyle.bestList
  const bestItem = bestStyleItem.item
  const CategorySkeleton = <Skeleton number={4} wrapper={list} inner={cart} />
  const ProductSkeleton = (
    <Skeleton number={4} wrapper={bestList} inner={bestItem} />
  )
  const category = await getCategoryes()
  const images = [
    { id: 2, src: "/slider/slide2.jpg" },
    { id: 3, src: "/slider/slide3.jpg" },
  ]
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
  }
  return (
    <div>
      <main>
        <IsToken />
        <Title coffeNum={"true"}>Кофейни:</Title>
        <CarouselSlider responsive={responsive}>
          <Image
            className={style.sliderItem}
            width={1000}
            height={400}
            src={img}
            alt={"slid-one"}
            placeholder="blur"
          />
          {images?.map((item) => (
            <Image
              className={style.sliderItem}
              width={1000}
              height={400}
              key={item.id}
              src={item.src}
              alt={item.src}
            />
          ))}
        </CarouselSlider>
        <LocationsList />
        <Title coffeNum={"false"} styles={style.title}>
          Асcортимент
        </Title>
        <Suspense fallback={CategorySkeleton}>
          <CategoryList page={"products"} />
        </Suspense>
        <Title coffeNum={"false"} styles={style.title}>
          Хиты продаж
        </Title>
        <Suspense fallback={ProductSkeleton}>
          <BestProductList dataList={bestProductList} category={category} />
        </Suspense>
        <WhyUsList />
      </main>
    </div>
  )
}
