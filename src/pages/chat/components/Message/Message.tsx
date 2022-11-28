import { Fragment } from 'react'

import { MessagesType } from 'components/ChatList/types'

const Message = ({ message }: { message: MessagesType }) => {
  const formattedDate = new Date(message.createdAt).toLocaleString('en-US', {})

  return (
    <Fragment>
      <div className="message">
        <div className="header">
          <strong>{message.sender.name ?? message?.sender?.username} </strong>
          <span>{formattedDate}</span>
        </div>
        <p className="message">{message?.message}</p>
      </div>
    </Fragment>
  )
}

export default Message
