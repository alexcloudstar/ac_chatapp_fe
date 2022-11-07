import React, { FC, useState } from 'react'
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'

import styles from './peep.module.css'

export type PeepProps = {
  owner: string
  isFavorite: boolean
  bgColor?: string
  bgImage?: string
  onClick: () => void
}

export const Peep: FC<PeepProps> = ({
  owner,
  isFavorite = false,
  bgColor = 'linear-gradient(175deg, rgba(3,169,241,1) 0%, rgba(160,2,90,1) 100%)',
  bgImage,
  onClick,
}) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite)

  const toggleFavorite = () => setIsFavoriteState(!isFavoriteState)

  return (
    <div className="relative w-fit mr-[15px]">
      <div
        className={styles.container}
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
        <span className={styles.owner}>{owner}</span>
      </div>
      <button className={styles.icon} onClick={toggleFavorite}>
        {isFavoriteState ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
      </button>
    </div>
  )
}
