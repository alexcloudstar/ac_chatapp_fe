import { User } from 'types'

export type MessagesType = {
  id: number
  message: string
  senderId: number
  sender: Pick<User, 'id' | 'username' | 'avatar'>
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
}

export type CreateConversationType = {
  userUsernames: string[]
  name: string
  profanityWords: string[]
  isPrivate: boolean
}
