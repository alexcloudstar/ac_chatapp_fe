import { FC } from 'react'

import { setLocalStorage } from '@/utils/localStorage'

import Error from './Error'
import Loading from './Loading'

export type ApiStateProps = {
  errorMessage?: string
  error?: string
}

const ApiState: FC<ApiStateProps> = ({
  errorMessage = 'Server error',
  error,
}) => {
  if (error === 'expiredToken') setLocalStorage('accessToken', '')

  return (
    <div className="absolute left-0 top-0 h-full w-full bg-orange-700 z-10 flex flex-col justify-center items-center text-xl">
      {errorMessage ? <Error errorMessage={errorMessage} /> : <Loading />}
    </div>
  )
}

export default ApiState
