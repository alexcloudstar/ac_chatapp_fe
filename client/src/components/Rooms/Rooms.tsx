import { SwiperSlide } from 'swiper/react'

import { RoomsSlider } from './components'

import { useGetUsersQuery } from '@/store/services/users'
import { Room } from '@/stories'
import { User } from '@/stories/types'
import { ApiState } from '../ApiState'

const Rooms = () => {
  const { data: users, error, isLoading } = useGetUsersQuery()

  if (error) return <ApiState errorMessage={error.data.message} />

  if (isLoading) return <ApiState />

  return (
    <>
      <h2 className="mt-[25px] mb-[15px]">Chatrooms</h2>
      <div>
        <RoomsSlider>
          {users?.map((user: User) => (
            <SwiperSlide key={user.id}>
              <Room
                owner={user.username || 'Unknown'}
                isFavorite={false}
                classes="mr-[15px]"
                bgImage={user.avatar}
                onClick={() => console.log('Room 1 clicked')}
              />
            </SwiperSlide>
          ))}
        </RoomsSlider>
      </div>
    </>
  )
}

export default Rooms
