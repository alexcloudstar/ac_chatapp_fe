import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { SwiperSlide } from 'swiper/react'

import { useGetUsersQuery } from 'store/services/users'
import { Peep } from 'stories'
import { ReduxQueryType, User } from 'types'

import { PeepsSlider } from './components'

const socket = io('http://localhost:4000')

const Peeps = () => {
  const [peeps, setPeeps] = useState<User[]>([])
  const { data: users, refetch } = useGetUsersQuery<ReduxQueryType<User[]>>()

  useEffect(() => {
    if (users) {
      setPeeps(users)
    }
  }, [users])

  useEffect(() => {
    socket.once(
      'isOnline',
      (data: { userId: User['id']; isOnline: User['isOnline'] }) => {
        refetch()
        setPeeps((prev) => {
          const index = prev.findIndex((user) => user.id === data.userId)
          const newPeeps = [...prev]
          newPeeps[index] = { ...newPeeps[index], isOnline: data.isOnline }

          return newPeeps
        })
      }
    )

    return () => {
      socket.off('isOnline')
    }
  }, [peeps, refetch])

  return (
    <>
      <h2 className="mt-[25px] mb-[15px]">Peeps</h2>
      <div className="w-full">
        <PeepsSlider>
          {peeps?.map((user: User) => (
            <SwiperSlide key={user.id}>
              <>
                <Peep
                  owner={user.username || 'Unknown'}
                  isFavorite={false}
                  bgImage={user.avatar}
                  onClick={() => console.log('Room 1 clicked')}
                />
                <div
                  className={`online-status ${
                    user?.isOnline ? 'bg-[#7cd452]' : 'bg-white'
                  } w-3.5 h-3.5 absolute bottom-0 left-2 rounded-[50px]`}
                ></div>
              </>
            </SwiperSlide>
          ))}
        </PeepsSlider>
      </div>
    </>
  )
}

export default Peeps
