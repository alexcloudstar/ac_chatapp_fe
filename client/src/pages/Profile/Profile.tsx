import React from 'react'
import { useForm } from 'react-hook-form'

import { useCurrentUserQuery } from '@/store/services/users'
import { ReduxQueryType, User } from '@/types'

interface ProfileFormProps {
  username: User['username']
  avatar: User['avatar']
  password: User['password']
  email: User['email']
  name: User['name']
}

const Profile = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useCurrentUserQuery<ReduxQueryType<User>>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormProps>()

  const onSubmit = (data: ProfileFormProps) => {
    console.log(data)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl mb-10">Configure your profile</h1>
      <form
        action="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-6/12"
      >
        <input
          type="text"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Name"
          defaultValue={user?.name}
          {...register('name', { required: true })}
        />
        {errors.name && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="text"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Username"
          defaultValue={user?.username}
          {...register('username', { required: true })}
        />
        {errors.username && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="text"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Avatar"
          defaultValue={user?.avatar}
          {...register('avatar')}
        />
        {errors.avatar && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="email"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Email"
          defaultValue={user?.email}
          {...register('email', { required: true })}
        />
        {errors.email && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="password"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <input
          type="password"
          className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
          placeholder="Confirm Password"
          {...register('password')}
        />
        {errors.password && (
          <p className="mt-5 mb-5 text-red-500">This field is required</p>
        )}

        <button
          type="submit"
          className="mt-5 mb-5 bg-white p-2 text-black rounded-xl	w-24 ease-in duration-150 hover:bg-slate-400 hover:text-white"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Profile
