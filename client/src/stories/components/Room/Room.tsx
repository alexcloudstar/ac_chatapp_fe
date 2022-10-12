import React, { FC, useState } from 'react'
import './room.css'
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'

type RoomProps = {
  owner: string
  isFavorite: boolean
  bgColor?: string
  bgImage?: string
}

export const Room: FC<RoomProps> = ({
  owner,
  isFavorite = false,
  bgColor,
  bgImage,
}) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite)

  const toggleFavorite = () => setIsFavoriteState(!isFavoriteState)

  return (
    <div
      className="room_container"
      style={
        bgColor
          ? { background: bgColor }
          : {
              backgroundImage: `url(${bgImage || ''})`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
            }
      }
    >
      <span className="room_owner">{owner}</span>
      <button className="room_icon" onClick={toggleFavorite}>
        {isFavoriteState ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
      </button>
    </div>
  )
}
