import CarouselSlider from "@/entities/CarouselSlider/ui/CarouselSlider"
import CategoryList from "@/widges/CategoryList/ui/CategoryList"
import LocationsList from "@/entities/LocationsList/ui/LocationsList"
import Title from "@/shared/ui/Title"
import Header from "@/widges/header/ui/Header"
import style from "./HomePage.module.css"
import { Suspense } from "react"
import Skeleton from "@/shared/ui/Skeleton"
import assortiment from "@/widges/CategoryList/ui/CategoryList.module.css"
import BestProductList from "@/widges/BestProductList/ui/BestProductList"
import bestStyle from "@/widges/BestProductList/ui/BestProductList.module.css"
import bestStyleItem from "@/entities/Product/ui/Product.module.css"
import WhyUsList from "@/widges/WhyUsList/ui/WhyUsList"
import { getProduct } from "../api/api"
import SenterWindow from "@/features/SenterWindow/ui/SenterWindow"

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
  return (
    <div>
      <Header />
      <SenterWindow dataList={bestProductList} />
      <main>
        <Title coffeNum={"true"}>Кофейни:</Title>
        <CarouselSlider />
        <LocationsList />
        <Title coffeNum={"false"} styles={style.title}>
          Асортимент
        </Title>
        <Suspense fallback={CategorySkeleton}>
          <CategoryList />
        </Suspense>
        <Title coffeNum={"false"} styles={style.title}>
          Хиты продаж
        </Title>
        <Suspense fallback={ProductSkeleton}>
          <BestProductList dataList={bestProductList} />
        </Suspense>
        <WhyUsList />
      </main>
    </div>
  )
}
