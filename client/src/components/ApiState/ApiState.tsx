import React, { FC } from 'react'

import Error from './Error'
import Loading from './Loading'

export type ApiStateProps = {
  errorMessage?: string
}

const ApiState: FC<ApiStateProps> = ({ errorMessage = 'Server error' }) => {
  errorMessage && console.error(errorMessage)

  return (
    <div className="absolute left-0 top-0 h-full w-full bg-orange-700 z-10 flex flex-col justify-center items-center text-xl">
      {errorMessage ? <Error errorMessage={errorMessage} /> : <Loading />}
    </div>
  )
}

export default ApiState
