import { configureStore } from "@reduxjs/toolkit";
import SliderSlice from '@/entities/CarouselSlider/ui/CarouselSliderSlice'
export const store = configureStore({
  reducer:{
    SliderSlice
  }
})