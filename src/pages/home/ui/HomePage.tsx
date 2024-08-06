import CarouselSlider from "@/entities/CarouselSlider/ui/CarouselSlider"
import Category from "@/entities/Category/ui/Category"
import LocationsList from "@/entities/LocationsList/ui/LocationsList"
import Title from "@/shared/ui/Title"
import Header from "@/widges/header/ui/Header"
import style from "./HomePage.module.css"
import { Suspense } from "react"
import Skeleton from "@/shared/ui/Skeleton"
import assortiment from "@/entities/Category/ui/Category.module.css"

export default async function Home() {
  const list = assortiment.cartList
  const cart = assortiment.cart
  const CategorySkeleton = <Skeleton number={4} wrapper={list} inner={cart} />
  return (
    <div className="container">
      <Header />
      <main>
        <Title coffeNum={"true"}>Кофейни:</Title>
        <CarouselSlider />
        <LocationsList />
        <Title coffeNum={"false"} styles={style.title}>
          Асортимент
        </Title>
        <Suspense fallback={CategorySkeleton}>
          <Category />
        </Suspense>
      </main>
    </div>
  )
}
