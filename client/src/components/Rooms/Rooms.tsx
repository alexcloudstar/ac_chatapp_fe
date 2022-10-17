import { SwiperSlide } from 'swiper/react'

import { Room } from '../../stories'

import { RoomsSlider } from './components'

const Rooms = () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Close&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Pale',
  }

  return (
    <>
      <h2 className="mt-[35px] mb-[15px]">Chatrooms</h2>
      <div>
        <RoomsSlider>
          <SwiperSlide>
            <Room
              owner={`${user.firstName} ${user.lastName}`}
              isFavorite
              classes="mr-[15px]"
              bgImage={user.avatar}
              onClick={() => console.log('Room 1 clicked')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Room
              owner={`Jane Doe`}
              isFavorite
              classes="mr-[15px]"
              bgImage={user.avatar}
              onClick={() => console.log('Room 2 clicked')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Room
              owner={`user 1`}
              isFavorite
              classes="mr-[15px]"
              bgImage={user.avatar}
              onClick={() => console.log('Room 3 clicked')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Room
              owner={`user 2`}
              isFavorite
              classes="mr-[15px]"
              bgImage={user.avatar}
              onClick={() => console.log('Room 4 clicked')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Room
              owner={`${user.firstName} ${user.lastName}`}
              isFavorite
              classes="mr-[15px]"
              bgImage={user.avatar}
              onClick={() => console.log('Room 5 clicked')}
            />
          </SwiperSlide>
        </RoomsSlider>
      </div>
    </>
  )
}

export default Rooms
