import React, { FC, useState } from 'react'
import './room.css'
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'

export type RoomProps = {
  owner: string
  isFavorite: boolean
  bgColor?: string
  bgImage?: string
  classes?: string
  onClick: () => void
}

export const Room: FC<RoomProps> = ({
  owner,
  isFavorite = false,
  bgColor = 'linear-gradient(175deg, rgba(3,169,241,1) 0%, rgba(160,2,90,1) 100%)',
  bgImage,
  classes,
  onClick,
}) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite)

  const toggleFavorite = () => setIsFavoriteState(!isFavoriteState)

  return (
    <div className="relative">
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
        onClick={onClick}
      >
        <span className="room_owner">{owner}</span>

        <button className="room_icon" onClick={toggleFavorite}>
          {isFavoriteState ? (
            <MdOutlineFavorite />
          ) : (
            <MdOutlineFavoriteBorder />
          )}
        </button>
      </div>
    </div>
  )
}
