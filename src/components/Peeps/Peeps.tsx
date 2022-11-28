import { SwiperSlide } from 'swiper/react'

import { useGetUsersQuery } from 'store/services/users'
import { Peep } from 'stories'
import { ReduxQueryType, User } from 'types'

import { PeepsSlider } from './components'

const Peeps = () => {
  const { data: users } = useGetUsersQuery<ReduxQueryType<User[]>>()

  return (
    <>
      <h2 className="mt-[25px] mb-[15px]">Peeps</h2>
      <div className="w-full">
        <PeepsSlider>
          {users?.map((user: User) => (
            <SwiperSlide key={user.id}>
              <Peep
                owner={user.username || 'Unknown'}
                isFavorite={false}
                bgImage={user.avatar}
                onClick={() => console.log('Room 1 clicked')}
              />
            </SwiperSlide>
          ))}
        </PeepsSlider>
      </div>
    </>
  )
}

export default Peeps
