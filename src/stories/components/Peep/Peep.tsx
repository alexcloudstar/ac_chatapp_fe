import { FC, useState } from 'react'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

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
        className="relative flex items-end w-[95px] min-w-[95px] h-[145px] rounded-[30px] pt-0 pr-5 pb-5 pl-5 text-white cursor-pointer"
        style={
          bgImage
            ? {
                backgroundImage: `url(${bgImage || ''})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }
            : { background: bgColor }
        }
        onClick={onClick}
      >
        <span className="pb-3 text-[12px]">{owner}</span>
      </div>
      <button
        className="absolute right-5 bottom-4 w-3 h-3 text-white"
        onClick={toggleFavorite}
      >
        {isFavoriteState ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
      </button>
    </div>
  )
}
