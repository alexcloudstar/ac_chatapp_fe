import { API_METHODS } from '@/types'
import { fetchAPI } from '@/utils/useAPI'
import React, { FC } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthFormInputs, AuthProps } from './types'

const Auth: FC<AuthProps> = ({ setIsLoggedIn }) => {
  const [isRegister, setIsRegister] = React.useState<boolean>(false)

  const switchFormMode = () => setIsRegister(!isRegister)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>()
  const onSubmit: SubmitHandler<AuthFormInputs> = (data) => {
    console.log(data)
    fetchAPI('http://localhost:4000/users/signin', API_METHODS.POST, data).then(
      (data) => {
        console.log(data) // JSON data parsed by `data.json()` call
      }
    )
  }

  fetchAPI('http://localhost:4000/users/whoami', API_METHODS.GET).then(
    (data) => {
      console.log(data) // JSON data parsed by `data.json()` call
    }
  )

  return (
    <div className="flex flex-col h-fit min-h-[350px] justify-between text-center pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white bg-[#596787] rounded-[40px]">
      <h1>Please {isRegister ? 'register' : 'login'}</h1>
      <form
        action="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <input
          type="email"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Email"
          {...register('email', { required: true })}
        />

        <input
          type="password"
          className="mt-2 mb-5 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Password"
          {...register('password', { required: true })}
        />

        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button type="button" onClick={switchFormMode}>
        Switch to {isRegister ? 'login' : 'register'}
      </button>
    </div>
  )
}

export default Auth
