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

export type DataType = {
  data?: {
    data?: {
      token: string
    }
  }
  error?: {
    data: {
      message: string
      error: string
    }
    status: number
  }
}
