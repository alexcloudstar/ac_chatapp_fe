import { FC, useEffect, useState } from 'react'

import { UserComponentType } from 'types'

type SizeProps = {
  width: number
  height: number
}

export type AvatarProps = {
  user: UserComponentType
  bgColor?: string
  classes?: string
  width?: SizeProps['width']
  height?: SizeProps['height']
  initialsWidth?: SizeProps['width']
  initialsHeight?: SizeProps['height']
}

export const Avatar: FC<AvatarProps> = ({
  user,
  bgColor,
  classes = '',
  width = 45,
  height = 45,
  initialsWidth = 15,
  initialsHeight = 7,
}) => {
  const [bgColorHex, setBgColorHex] = useState<string>('')

  useEffect(() => {
    setBgColorHex(bgColor ?? Math.floor(Math.random() * 16777215).toString(16))
  }, [bgColor])

  return (
    <div className={classes} style={{ width, height }}>
      {user?.avatar ? (
        <img
          src={user?.avatar}
          alt={`${`${user.username}` || ''} avatar`}
          className={`mr-[17px] rounded-full object-cover`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
      ) : (
        <span
          className={`text-white rounded-full flex justify-center items-center`}
          style={{
            backgroundColor: `#${bgColorHex}`,
            padding: `${initialsHeight}px ${initialsWidth}px`,
            width: `${width}px`,
            height: `${height}px`,
            fontSize: `${width / 3}px`,
          }}
        >
          {user?.username[0].toLocaleUpperCase()}
        </span>
      )}
    </div>
  )
}
