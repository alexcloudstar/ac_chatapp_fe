/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useSigninMutation, useSignupMutation } from 'store/services/auth'
import { useCurrentUserQuery } from 'store/services/users'
import { type AuthFormInputs, type ReduxQueryType, type User } from 'types'
import { setLocalStorage } from 'utils/localStorage'

const Auth = () => {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

  const switchFormMode = () => setIsRegister(!isRegister)

  const [signin] = useSigninMutation()
  const [signup] = useSignupMutation()

  const { refetch } = useCurrentUserQuery<ReduxQueryType<User>>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit: SubmitHandler<AuthFormInputs> = async (formData) => {
    let res

    if (isRegister) {
      res = await signup(formData)
    } else {
      res = await signin(formData)
    }

    if (
      // @ts-ignore
      res?.error &&
      // @ts-ignore
      res?.error?.data?.error !== 'invalid_credentials' &&
      // @ts-ignore
      res?.error?.data?.error !== 'user_already_exists' &&
      // @ts-ignore
      res?.error?.data?.error !== 'user_does_not_exist'
    )
      return setApiErrorMessage('Something went wrong, please try again later')

    // @ts-ignore
    if (res?.error?.data.error === 'user_already_exists')
      // @ts-ignore
      return setApiErrorMessage(res?.error?.data.message)

    // @ts-ignore
    if (res?.error?.data.error === 'invalid_credentials')
      // @ts-ignore
      return setApiErrorMessage(res?.error?.data.message)

    // @ts-ignore
    if (res?.error?.data.error === 'user_does_not_exist')
      // @ts-ignore
      return setApiErrorMessage(res?.error?.data.message)

    // @ts-ignore
    setLocalStorage('accessToken', res.data.accessToken)
    refetch()

    navigate('/')
  }

  return (
    <div className="flex flex-col justify-around w-[80%] md:w-[40%] h-[50%] pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white rounded-[40px] shadow-floating-container">
      <div className="text-center ">
        <h1 className="text-[24px]">Welcome 👋🏻</h1>
      </div>
      <form
        action="POST"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center"
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

        {isRegister && (
          <input
            type="text"
            className="mt-2 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Username"
            {...register('username', { required: true })}
          />
        )}
        {errors.username && (
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

        <button
          type="submit"
          className="mt-5 mb-5 bg-white p-2 text-black rounded-xl	w-24"
        >
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
