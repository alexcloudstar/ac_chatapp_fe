import React, { FC } from 'react'
import { ApiStateProps } from './ApiState'

const Error: FC<ApiStateProps> = ({ errorMessage }) => (
  <>
    <p>{errorMessage}</p>
    <p>Please try again later</p>
  </>
)

export default Error
