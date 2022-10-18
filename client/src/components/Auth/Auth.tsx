import React, { FC } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthFormInputs, AuthProps } from './types'

const Auth: FC<AuthProps> = ({ setIsLoggedIn }) => {
  const [isRegister, setIsRegister] = React.useState<boolean>(false)

  const switchFormMode = () => setIsRegister(!isRegister)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormInputs>()
  const onSubmit: SubmitHandler<AuthFormInputs> = (data) => console.log(data)

  // console.log(watch('email'))
  // console.log(watch('password'))
  // console.log(errors)

  // https://react-hook-form.com/get-started

  return (
    <div className="flex flex-col h-fit min-h-[350px] justify-between text-center pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white bg-[#596787] rounded-[40px]">
      <h1>Please {isRegister ? 'register' : 'login'}</h1>
      <form
        action="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <input
          type="text"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Email"
          {...(register('email'), { required: true })}
        />
        {errors.email && <span>This field is required</span>}

        <input
          type="password"
          className="mt-2 mb-5 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Password"
          {...(register('password'), { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button type="button" onClick={switchFormMode}>
        Switch to {isRegister ? 'login' : 'register'}
      </button>
    </div>
  )
}

export default Auth
