import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AuthFormInputs, AuthProps } from './types'

import { API_METHODS } from '@/types'
import { fetchAPI } from '@/utils/api'
import { setLocalStorage } from '@/utils/localStorage'

const Auth: FC<AuthProps> = ({ setIsLoggedIn }) => {
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

  const switchFormMode = () => setIsRegister(!isRegister)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>()
  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    console.log(data)
    try {
      const APIData: {
        accessToken: string
        error: string
        message: string
      } = await fetchAPI(
        'http://localhost:4000/auth/signin',
        API_METHODS.POST,
        '',
        data
      )

      if (APIData.error) {
        return setApiErrorMessage(APIData.message)
      }

      setLocalStorage('accessToken', APIData.accessToken)
      // setIsLoggedIn(true)
    } catch (error) {
      setApiErrorMessage('Something went wrong')
    }
  }

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
        {errors.email && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="password"
          className="mt-2 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <p className="mt-5 text-red-500">This field is required</p>
        )}

        {apiErrorMessage && (
          <p className="mt-3 text-red-500">{apiErrorMessage}</p>
        )}

        <button type="submit" className="mt-5 mb-5">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <button type="button" onClick={switchFormMode}>
        Switch to {isRegister ? 'login' : 'register'}
      </button>
    </div>
  )
}

export default Auth
