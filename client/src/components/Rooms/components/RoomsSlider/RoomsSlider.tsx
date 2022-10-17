import React, { FC } from 'react'
import { Pagination } from 'swiper'
import { Swiper } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

type RoomsSliderProps = {
  children: React.ReactNode
}

const RoomsSlider: FC<RoomsSliderProps> = ({ children }) => {
  return (
    <Swiper
      slidesPerView={3}
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

export default RoomsSlider
