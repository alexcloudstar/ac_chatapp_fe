import { User } from 'types'

export type MessagesType = {
  id: number
  message: string
  senderId: number
  sender: Pick<User, 'id' | 'name' | 'username' | 'avatar'>
  createdAt: string
}

export type ConversationType = {
  id: string
  isPrivate: boolean
  messages: MessagesType[]
  name: string
  profanityWords: string[]
  userOwnerId: number
  users: Pick<User, 'id'>[]
  createdAt: Date
  roomAvatar?: string
}

export type CreateConversationType = Pick<
  ConversationType,
  'name' | 'profanityWords' | 'isPrivate' | 'roomAvatar'
> & {
  userUsernames: string[]
}

export type UpdateConversationType = Pick<
  ConversationType,
  'id' | 'name' | 'profanityWords' | 'isPrivate'
>
