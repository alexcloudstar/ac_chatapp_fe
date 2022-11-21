import { FC } from 'react'

import { MessagePreview } from 'stories'
import { UserComponentType } from 'types'

type PreviewProps = {
  user: UserComponentType
  message: string
  time: string
}

const Preview: FC<PreviewProps> = ({ user, message, time }) => {
  return (
    <>
      <MessagePreview
        user={user}
        time={time}
        message={message}
        classes="text-[13px] mb-[25px]"
      />
    </>
  )
}

export default Preview
