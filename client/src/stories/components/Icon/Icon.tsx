import { FC, ReactElement } from 'react'

export enum TextPosition {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}

export const Icon: FC<{
  icon: ReactElement<any, any>
  text?: string
  textPosition?: TextPosition
  onClick?: () => void
  hoverColor?: string
  hoverDuration?: string
  transition?:
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | 'linear'
    | 'step-start'
    | 'step-end'
    | 'initial'
    | 'inherit'
    | undefined
}> = ({
  icon,
  text,
  textPosition = TextPosition.RIGHT,
  onClick,
  hoverColor = 'text-red-500',
  hoverDuration = 'duration-150',
  transition = 'ease-in',
}) => {
  const renderClass = () => {
    switch (textPosition) {
      case TextPosition.TOP:
        return 'flex-col'
      case TextPosition.BOTTOM:
        return 'flex-col-reverse'
      case TextPosition.LEFT:
        return 'flex-row'
      case TextPosition.RIGHT:
        return 'flex-row-reverse'
      default:
        return 'flex-col-reverse'
    }
  }

  return (
    <div
      className={`flex justify-center items-center cursor-pointer ${transition} ${hoverDuration} hover:${hoverColor}`}
      onClick={onClick}
    >
      <span className={`flex items-center ${renderClass()}`}>
        <>
          {text && <span className="text-[14px] mr-1 ml-1">{text}</span>}
          {icon}
        </>
      </span>
    </div>
  )
}
