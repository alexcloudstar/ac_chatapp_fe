import React, { FC } from 'react'
import { Pagination } from 'swiper'
import { Swiper } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

type PeepsSliderProps = {
  children: React.ReactNode
}

const PeepsSlider: FC<PeepsSliderProps> = ({ children }) => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 6,
        },
        1920: {
          slidesPerView: 12,
        },
      }}
      spaceBetween={12}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="pb-[45px]"
    >
      {children}
    </Swiper>
  )
}

export default PeepsSlider
