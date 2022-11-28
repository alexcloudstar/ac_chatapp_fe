export enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type User = {
  id: number
  email: string
  name: string
  username: string
  avatar: string
  createdAt: string
  password?: string
  isOnline?: boolean
}

export type UserComponentType = {
  avatar?: User['avatar']
  username: User['username']
}

export type ReduxQueryType<T> = {
  data: T
  error: {
    data: {
      message: string
      error: string
    }
  }

  isLoading: boolean
}

export type AuthFormInputs = {
  email: string
  password: string
  username?: string
}

export type ApiResponseState = {
  type: 'success' | 'error'
  message: string
}

export type SendMessageType = {
  roomId: number
  message: string
}

export type RemoveMessageType = {
  roomId: number
  messageId: string
}
