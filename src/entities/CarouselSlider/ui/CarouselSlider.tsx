"use client"

import Image from "next/image"
import style from "./CarouselSlider.module.css"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { useEffect, useState } from "react"
import img from '@/../public/slider/slide1.jpg'
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
    { id: 2, src: "/slider/slide2.jpg" },
    { id: 3, src: "/slider/slide3.jpg" },
  ]
  return (
    <div className={`container ${style.slider} `}>
      {isVisible ? (
        <div className={style.skeleton}></div>
      ) : (
        <Carousel responsive={responsive} infinite={true}>
          <Image
              className={style.sliderItem}
              width={1000}
              height={400}
              src={img}
              alt={'slid-one'}
              placeholder='blur'
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
        </Carousel>
      )}
    </div>
  )
}

export default CarouselSlider
