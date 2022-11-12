import { FC } from 'react'

import { UserComponentType } from 'types'

import { Avatar } from '../Avatar'

type MessagePreviewProps = {
  user: UserComponentType
  message: string
  time: string
  classes?: string
}

export const MessagePreview: FC<MessagePreviewProps> = ({
  user,
  message,
  time,
  classes,
}) => (
  <div className={`flex justify-between ${classes ? classes : ''}`}>
    <div className="flex mr-[50px]">
      <Avatar user={user} />
      <div className="w-full ml-2">
        <span className="pb-[10px] text-[15px]">{user.username}</span>
        <p className="text-[13px]">{message}</p>
      </div>
    </div>

    <span>{time}</span>
  </div>
)
