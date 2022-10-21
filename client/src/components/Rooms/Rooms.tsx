import { useCallback, useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'

import { RoomsSlider } from './components'

import { Room } from '@/stories'
import { User } from '@/stories/types'
import { API_METHODS } from '@/types'
import { fetchAPI } from '@/utils/api'
import { getLocalStorage } from '@/utils/localStorage'

const Rooms = () => {
  const [users, setUsers] = useState<User[]>([])

  const getUsers = useCallback(async () => {
    const APIData: User[] = await fetchAPI(
      'http://localhost:4000/users/',
      API_METHODS.GET,
      getLocalStorage('accessToken') || ''
    )

    setUsers(APIData.filter((user) => user.id !== 1)) // TODO: implement redux toolkit
  }, [])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <>
      <h2 className="mt-[25px] mb-[15px]">Chatrooms</h2>
      <div>
        <RoomsSlider>
          {users.map((user) => (
            <SwiperSlide key={user.id}>
              <Room
                owner={user.username}
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
