import { SwiperSlide } from 'swiper/react'

import { useGetUsersQuery } from '@/store/services/users'
import { Room } from '@/stories'
import { ReduxQueryType, User } from '@/types'

import { ApiState } from '../ApiState'

import { RoomsSlider } from './components'

const Rooms = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useGetUsersQuery<ReduxQueryType<User[]>>()

  if (error)
    return (
      <ApiState
        errorMessage={error?.data?.message}
        error={error?.data?.error}
      />
    )

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
