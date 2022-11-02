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
}

export type UserComponentType = {
  avatar: User['avatar']
  username: User['username']
}
