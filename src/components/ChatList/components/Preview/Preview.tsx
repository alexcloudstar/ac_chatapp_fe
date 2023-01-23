import { FC } from 'react'

import { MessagePreview } from 'stories'
import { AvatarProps } from 'stories/components/Avatar/Avatar'
import { UserComponentType } from 'types'

type PreviewProps = {
  user: UserComponentType
  message: string
  time: string
  conversationName: string
  width?: AvatarProps['width']
  height?: AvatarProps['height']
}

const Preview: FC<PreviewProps> = ({
  user,
  message,
  time,
  conversationName,
  width,
  height,
}) => {
  return (
    <>
      <MessagePreview
        conversationName={conversationName}
        user={user}
        time={time}
        message={message}
        classes="text-[13px] mt-[25px] mb-[25px]"
        width={width}
        height={height}
      />
    </>
  )
}

export default Preview
