import { FC } from 'react'

import { UserComponentType } from '@/types'

type SizeProps = {
  width: number
  height: number
}

type AvatarProps = {
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
  bgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  classes = '',
  width = 45,
  height = 45,
  initialsWidth = 15,
  initialsHeight = 7,
}) => (
  <div className={classes} style={{ width, height }}>
    {user?.avatar ? (
      <img
        src={user?.avatar}
        alt={`${`${user.username}` || ''} avatar`}
        className={`mr-[17px] rounded-full`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
    ) : (
      <span
        className={`inline-block text-white rounded-full`}
        style={{
          backgroundColor: bgColor,
          padding: `${initialsHeight}px ${initialsWidth}px`,
        }}
      >
        {user.username[0].toLocaleUpperCase()}
      </span>
    )}
  </div>
)
