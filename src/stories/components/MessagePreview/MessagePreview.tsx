import { FC } from 'react'

import { UserComponentType } from 'types'

import { Avatar } from '../Avatar'
import { AvatarProps } from '../Avatar/Avatar'

type MessagePreviewProps = {
  user: UserComponentType
  message: string
  time: string
  classes?: string
  conversationName: string
  width?: AvatarProps['width']
  height?: AvatarProps['height']
}

export const MessagePreview: FC<MessagePreviewProps> = ({
  user,
  message,
  time,
  classes,
  conversationName,
  width,
  height,
}) => (
  <div className={`flex justify-between ${classes ? classes : ''}`}>
    <div className="flex mr-[50px]">
      <Avatar user={user} width={width} height={height} />
      <div className="w-full ml-2">
        <span className="pb-[10px] text-[15px]">
          <strong>{conversationName}</strong> - {user.username}
        </span>
        <p className="text-[13px]">{message}</p>
      </div>
    </div>

    <span>{time}</span>
  </div>
)
