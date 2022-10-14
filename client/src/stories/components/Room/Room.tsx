import React, { FC, useState } from 'react'
import './room.css'
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'

type RoomProps = {
  owner: string
  isFavorite: boolean
  bgColor?: string
  bgImage?: string
  classes?: string
}

export const Room: FC<RoomProps> = ({
  owner,
  isFavorite = false,
  bgColor,
  bgImage,
  classes,
}) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite)

  const toggleFavorite = () => setIsFavoriteState(!isFavoriteState)

  return (
    <div
      className={`room_container ${classes ? classes : ''}`}
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
