import { SwiperSlide } from 'swiper/react'

import { useGetUsersQuery } from '@/store/services/users'
import { Peep } from '@/stories'
import { ReduxQueryType, User } from '@/types'

import { ApiState } from '../ApiState'

import { PeepsSlider } from './components'

const Peeps = () => {
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
      <h2 className="mt-[25px] mb-[15px]">Peeps</h2>
      <div>
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
