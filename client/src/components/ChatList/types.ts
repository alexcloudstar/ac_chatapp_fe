import { User } from '@/stories/types'

export type MessagesType = {
  id: number
  message: string
  senderId: number
  sender: Pick<User, 'id' | 'username' | 'avatar'>
}

export type ConversationType = {
  id: string
  isPrivate: boolean
  messages: MessagesType[]
  name: string
  profanityWords: string[]
  userOwnerId: number
  users: Pick<User, 'id'>[]
}

export type CreateConversationType = {
  userIds: string[]
  name: string
  profanityWords: string[]
  isPrivate: boolean
}
