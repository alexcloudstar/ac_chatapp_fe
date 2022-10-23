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
