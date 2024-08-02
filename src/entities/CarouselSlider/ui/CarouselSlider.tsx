"use client"

import Image from "next/image"
import style from "./CarouselSlider.module.css"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { useEffect, useState } from "react"

const CarouselSlider = () => {
  const [isVisible, setIsVisible] = useState(true)
useEffect(() => {
    setIsVisible(false)
  }, [Carousel])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }
  const images = [
    { id: 1, src: "/slide1.jpg" },
    { id: 2, src: "/slide2.jpg" },
    { id: 3, src: "/slide3.jpg" },
  ]
  return (
    <div className={style.slider}>
      {isVisible ? (
        <div className={style.skeleton}></div>
      ) : (
        <Carousel responsive={responsive} infinite={true}>
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
        </Carousel>
      )}
    </div>
  )
}

export default CarouselSlider
